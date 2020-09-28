// Here we run the program that takes the input for the Manager
// and each Employee to be displayed in the HTML.
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Here we connect to our htmlRenderer in the lib folder.
const render = require("./lib/htmlRenderer");
// Here we tell the program where we want to output our render
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

function getEmployeeType() {
  return inquirer.prompt([
    {
      type: "list",
      message: "Team member is an: ",
      choices: ["Engineer", "Intern"],
      name: "role",
    },
  ]);
}

function getStandardQuestions(role) {
  const standardQuestions = [
    {
      type: "input",
      message: `Name of ${role}: `,
      name: "name",
    },
    {
      type: "input",
      message: `ID# of ${role}: `,
      name: "id",
    },
    {
      type: "input",
      message: `Email for ${role}: `,
      name: "email",
    },
  ];

  let questions;

  if (role == "Engineer") {
    questions = [
      ...standardQuestions,
      {
        type: "input",
        message: `GitHub for ${role}: `,
        name: "github",
      },
    ];
  } else if (role == "Intern") {
    questions = [
      ...standardQuestions,
      {
        type: "input",
        message: `School for ${role}: `,
        name: "school",
      },
    ];
  } else if (role == "Manager") {
    questions = [
      ...standardQuestions,
      {
        type: "input",
        message: `Office Number for ${role}: `,
        name: "officeNumber",
      },
    ];
  }

  return inquirer.prompt(questions);
}

// Asks to add another team member
function addMorePrompt() {
  return inquirer.prompt([
    {
      type: "list",
      message: `Add another team member? : `,
      choices: ["Yes", "No"],
      name: "confirm",
    },
  ]);
}

async function run() {
  const employees = [];
  let firstRun = true;
  do {
    if (!firstRun) {
      type = await getEmployeeType();
    } else {
      firstRun = false;
      type = { role: "Manager" };
    }

    let data = await getStandardQuestions(type.role);
    switch (type.role) {
      case "Engineer":
        employees.push(
          new Engineer(data.name, data.id, data.email, data.github)
        );
        break;
      case "Intern":
        employees.push(new Intern(data.name, data.id, data.email, data.school));
        break;
      case "Manager":
        employees.push(
          new Manager(data.name, data.id, data.email, data.officeNumber)
        );
        break;
    }

    // program will continue to ask if you want to add more team members until you select "no"
    var getMore = await addMorePrompt();
  } while (getMore.confirm != "No");

  const html = render(employees);

  // catches error if one exists. If not, then returns consol.log
  try {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
  } catch (err) {
    return console.log(err);
  }
  fs.writeFile(outputPath, html, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Team has been registered");
  });
}

// runs the code
run();

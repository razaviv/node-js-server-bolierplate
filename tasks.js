// This is a mini script, creating new resources easily

var program = require('commander');
var { prompt } = require('inquirer');
var fs = require('fs');
var request = require('request');
var shell = require('shelljs');

program
  .version('1.0.0');

const add_questions = [
  {
    type: "input",
    name: "key",
    message: "Enter the resource name:"
  }
];

program
  .command("new")
  .description("Add a resource")
  .action(() => {
    prompt(add_questions).then(answers => {
      try {
        if (!answers.key) throw new Error("Resource not found");
        shell.mkdir('-p', "resources/" + answers.key);
        shell.mkdir('-p', "resources/" + answers.key + "/api");
        shell.mkdir('-p', "resources/" + answers.key + "/services");
        fs.appendFile("resources/" + answers.key + "/" + answers.key + "-router.js", "router data", err => {
          if (err) throw err;
          fs.appendFile("resources/" + answers.key + "/" + answers.key + "-model.js", "model data", err => {
            if (err) throw err;
            console.log(`New resource ${answers.key} has been created`);
          });
        });
      }
      catch(err) { console.log(`${err.name}: ${err.message}`); }
    });
  })

  program.parse(process.argv);

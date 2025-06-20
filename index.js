const fs = require("fs");
const filePath = "tasks.json";

// Setting up the program, checks if the Json files exists,
// if exists, it assign it's value to the variable currentData,
// if it doesn't, it generates one empty.
// (Done)
let currentData = [];
const setupJson = () => {
  if (fs.existsSync(filePath)) {
    try {
      let fileContent = fs.readFileSync(filePath, "utf8");
      currentData = JSON.parse(fileContent);
    } catch (err) {
      console.log(err);
    }
  }
  if (!fs.existsSync(filePath)) {
    const data = [{}];
    const jsonString = JSON.stringify(data, null, 2);
    try {
      fs.writeFileSync(filePath, jsonString);
      console.log(`JSON file ${filePath} created with success.`);
    } catch (err) {
      console.error(err);
    }
  }
};
setupJson();

//Use an object as an argument (done)
const updateJsonFile = (data) => {
  let currentDataJson = JSON.stringify(data, null, 2);
  try {
    fs.writeFileSync(filePath, currentDataJson);
    console.log("Success");
  } catch (err) {
    console.log(err);
  }
};

//Input handling:
const args = process.argv.slice(2); // Get arguments starting from the 3rd element
//Guide how to use: (done)
if (!args[0]) {
  console.log("Welcome to the Track Task CLI app");
  console.log("Usage: node index.js <command> [arguments]");
  console.log(
    `Commands: 
  add [task name]
  update [task before] [task after] 
  delete [task name] 
  complete [task name]
  list [all/done/progress]`
  );
}
if (args[0]) {
  const command = args[0];

  switch (command) {
    case "add":
      console.log(`Adding ${args[1]} to list`);
      currentData.push({ task: args[1], status: "progress" });
      updateJsonFile(currentData);
      break;
    case "update":
      console.log(`Updating ${args[1]} with ${args[2]}`);
      updatedData = [];
      for (i in currentData) {
        if (currentData[i].task == args[1]) {
          currentData[i].task = args[2];
          updatedData.push(currentData[i]);
        } else {
          updatedData.push(currentData[i]);
        }
      }
      updateJsonFile(updatedData);
      break;
    case "delete":
      console.log(`Deleting ${args[1]}`);
      let dataAfterDelete = [];
      for (i in currentData) {
        if (currentData[i].task != args[1]) {
          dataAfterDelete.push(currentData[i]);
        }
      }
      updateJsonFile(dataAfterDelete);
      break;
    case "complete":
      console.log(`Marking ${args[1]} as done`);
      let dataAfterComplete = [];
      for (i in currentData) {
        if (currentData[i].task == args[1]) {
          currentData[i].status = "done";
          dataAfterComplete.push(currentData[i]);
        } else {
          dataAfterComplete.push(currentData[i]);
        }
      }
      updateJsonFile(dataAfterComplete);
      break;

    //Consulting (done):
    case "list":
      if (!args[1]) {
        console.log(`Please, use all, done or progress (after the list command).`);
        break;
      }
      if (!currentData[0]) {
        console.log(`There are no tasks to show.`);
        break;
      }
      if (args[1] == "all") {
        console.log(`Listing all tasks:`);
        for (i in currentData) {
          console.log(`Task: ${currentData[i].task}, status: ${currentData[i].status}.`);
        }
      }
      if (args[1] == "done") {
        console.log(`Listing done tasks:`);
        for (i in currentData) {
          if (currentData[i].status == "done") {
            console.log(`Task ${i}: ${currentData[i].task}, status: ${currentData[i].status}.`);
          }
        }
      }
      if (args[1] == "progress") {
        console.log(`Listing tasks in progress:`);
        for (i in currentData) {
          if (currentData[i].status == "progress") {
            console.log(`Task ${i}: ${currentData[i].task}, status: ${currentData[i].status}.`);
          }
        }
      }
      break;
    //If command doesn't exists (done):
    default:
      console.log(`Unknown command: ${command}`);
      console.log("Type 'node index.js' for usage information.");
  }
}

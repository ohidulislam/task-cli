#!/usr/bin/env node
const { print, info, add, mark, update, deleteItem } = require("./utils");

const args = process.argv.slice(2);
// console.log("args", args);
const flag = args[0];
const command = args[1];
const marking = args[2];
const flags = ["-p", "-a", "-d", "-m", "-h"];

switch (flag) {
  case "-p":
    print(command);
    return;
  case "-a":
    add(command);
    return;
  case "-d":
    deleteItem(command);
    break;
  case "-u":
    update(command, marking);
    break;
  case "-m":
    mark(command, marking);
    break;
  case "-h":
    info(flag);
    break;
  default:
    console.log("Invalid flag");
    break;
}

// commands example
// task-cli -p tasks
// task-cli -a task (name)
// task-cli -d task (ID)
// task-cli -m task (name) progress/in-progress/completed (status)
// task-cli -h

const fs = require("fs/promises");
const readline = require("node:readline");
const {
  getTasks,
  addTask,
  updateTask,
  markTask,
  deleteTask,
} = require("./tasks");
const {
  getLessons,
  addLesson,
  updateLesson,
  markLesson,
  deleteLesson,
} = require("./lessons");
// const { lessons } = require("./data/lessons.json");

const printOptions = ["tasks", "lessons"];

async function print(command) {
  if (printOptions.includes(command) && command === printOptions[0]) {
    const tasks = await getTasks();
    console.log(tasks);
  } else if (printOptions.includes(command) && command === printOptions[1]) {
    const lessons = await getLessons();
    console.log(lessons);
  } else console.log(`Nothing found with the keyword: ${command}`);
}

function info(flag) {
  console.log("OPTIONS:");
  if (flag === "-h") {
    console.log(
      `-p [tasks/lessons]                              : Print either all Tasks/Lessons`
    );
    console.log(
      `-a [tasks/lessons]                              : Adds either a Task/Lesson`
    );
    console.log(
      `-u [tasks/lessons]                              : Updates either a Task/Lesson`
    );
    console.log(
      `-d [tasks/lessons]                              : Delete either a Task/Lesson`
    );
    console.log(
      `-m [tasks/lessons] [in-progress/completed]      : Mark a Task as Progress/In-progress/Complete`
    );
  }
  return;
}

function add(command) {
  const isTask = command === printOptions[0];
  const question = isTask ? "Enter task name: " : "Enter lesson name: ";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(question, (answer) => {
    isTask ? addTask(answer) : addLesson(answer);
    rl.close();
  });
}

async function deleteItem(command) {
  const isTask = command === printOptions[0];
  if (!printOptions.includes(command)) return;
  const question = isTask ? "Enter task ID: " : "Enter lesson ID: ";
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(question, (answer) => {
    isTask ? deleteTask(answer) : deleteLesson(answer);
    rl.close();
  });
}

function update(command, marking) {
  const isTask = command === printOptions[0];
  const question = isTask ? "Enter task name: " : "Enter lesson name: ";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(question, (answer) => {
    isTask
      ? updateTask({ id: marking, name: answer })
      : updateLesson({ id: marking, name: answer });
    rl.close();
  });
}

async function mark(command, marking) {
  const isTask = command === printOptions[0];
  const question = isTask ? "Enter task ID: " : "Enter lesson ID: ";

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(question, (answer) => {
    isTask
      ? markTask({ id: answer, marking })
      : markLesson({ id: answer, marking });
    rl.close();
  });
}

module.exports = {
  print,
  info,
  add,
  deleteItem,
  mark,
  update,
};

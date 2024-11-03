const fs = require("fs/promises");

async function writeToFile(path, data) {
  return await fs.writeFile(`data/${path}.json`, JSON.stringify(data));
}

async function getTasks() {
  const data = await fs.readFile("data/tasks.json", "utf-8");
  return JSON.parse(data);
}

async function addTask(name) {
  const tasks = await getTasks();
  tasks.push({ id: tasks.length + 1, name, progress: "in-progress" });
  writeToFile("tasks", tasks).then(() =>
    console.log("Task added successfully!")
  );
}

async function updateTask({ id, name }) {
  let tasks = await getTasks();
  let task = tasks.find((item) => item.id === +id);
  if (!task) {
    console.log("Task not found!");
    return;
  }
  task.name = name;
  task.progress = "in-progress";
  writeToFile("tasks", tasks).then(() =>
    console.log(`Task #${id} updated successfully!`)
  );
}

async function markTask({ id, marking }) {
  let tasks = await getTasks();
  let task = tasks.find((item) => item.id === +id);
  if (!task) {
    console.log("Task not found!");
    return;
  }
  task.progress = marking.toString();
  writeToFile("tasks", tasks).then(() =>
    console.log(`Task #${id} marked as ${marking}.`)
  );
}

async function deleteTask(id) {
  let tasks = await getTasks();
  tasks = tasks.filter((item) => item.id !== +id);
  writeToFile("tasks", tasks).then(() => console.log(`Task #${id} deleted.`));
}

module.exports = {
  getTasks,
  addTask,
  updateTask,
  markTask,
  deleteTask,
};

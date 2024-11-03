const fs = require("fs/promises");

async function writeToFile(path, data) {
  return await fs.writeFile(`data/${path}.json`, JSON.stringify(data));
}

async function getLessons() {
  const data = await fs.readFile("data/lessons.json", "utf-8");
  return JSON.parse(data);
}

async function addLesson(name) {
  const lessons = await getLessons();
  lessons.push({ id: lessons.length + 1, name, watched: false });
  writeToFile("lessons", lessons).then(() =>
    console.log("Lesson added successfully!")
  );
}

async function updateLesson({ id, name }) {
  let lessons = await getLessons();
  let lesson = lessons.find((item) => item.id === +id);
  if (!lesson) {
    console.log("Lesson not found!");
    return;
  }
  lesson.name = name;
  lesson.watched = false;
  writeToFile("lessons", lessons).then(() =>
    console.log(`Lesson #${id} updated successfully!`)
  );
}

async function markLesson({ id, marking }) {
  let lessons = await getLessons();
  let lesson = lessons.find((item) => item.id === +id);
  if (!lesson) {
    console.log("Lesson not exits!");
    return;
  }

  lesson.watched = marking === "true" ? true : false;
  writeToFile("lessons", lessons).then(() =>
    console.log(`Lesson #${id} marked as ${marking}.`)
  );
}

async function deleteLesson(id) {
  let lessons = await getLessons();
  lessons = lessons.filter((item) => item.id !== +id);
  writeToFile("lessons", lessons).then(() =>
    console.log(`Lesson #${id} deleted.`)
  );
}

module.exports = {
  getLessons,
  addLesson,
  updateLesson,
  markLesson,
  deleteLesson,
};

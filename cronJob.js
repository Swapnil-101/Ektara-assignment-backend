const cron = require('node-cron');
const fs = require('fs/promises');

const tasksFilePath = 'tasks.json';

async function deleteCompletedTasks() {
  try {
    let tasks = await fs.readFile(tasksFilePath, 'utf-8');
    tasks = JSON.parse(tasks);
    tasks = tasks.filter((task) => !task.completed);
    await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
    console.log('Completed tasks deleted.');
  } catch (error) {
    console.error('Error deleting completed tasks:', error);
  }
}

cron.schedule('0 0 * * *', deleteCompletedTasks);

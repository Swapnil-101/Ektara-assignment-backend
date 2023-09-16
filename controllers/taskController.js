const fs = require('fs/promises');
const tasksFilePath = 'tasks.json';

async function readTasks() {
  try {
    const tasksData = await fs.readFile(tasksFilePath, 'utf-8');
    return JSON.parse(tasksData);
  } catch (error) {
    return [];
  }
}

async function writeTasks(tasks) {
  await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
}

exports.createTask = async (req, res) => {
  const newTask = req.body;
  try {
    const tasks = await readTasks();

    
    const taskId = Date.now().toString();

    //auto id
    newTask.id = taskId;

    tasks.push(newTask);
    await writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating task.' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await readTasks();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving tasks.' });
  }
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const updatedTask = req.body;
  try {
    let tasks = await readTasks();
    tasks = tasks.map((task) => (task.id === taskId ? { ...task, ...updatedTask } : task));
    await writeTasks(tasks);
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating task.' });
  }
};

exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  try {
    let tasks = await readTasks();
    tasks = tasks.filter((task) => task.id !== taskId);
    await writeTasks(tasks);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting task.' });
  }
};

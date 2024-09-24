const Task = require("../models/Task");

let message = "";
let type = "";

const getAllTasks = async (req, res) => {
  try {
    setTimeout(() => {
      message = "";
    }, 1000);
    const tasksList = await Task.find();
    return res.render("index", {
      tasksList,
      task: null,
      taskDelete: null,
      message,
      type,
    });
  } catch (error) {
    res.status(500).send({ erro: error.message });
  }
};

const createTask = async (req, res) => {
  const task = req.body;

  if (!task.task) {
    message = "Insira um texto antes de adicionar uma tarefa";
    type = "danger";
    return res.redirect("/");
  }

  try {
    await Task.create(task);
    message = "Tarefa criada com sucesso";
    type = "success";
    return res.redirect("/");
  } catch (error) {
    res.status(500).send({ error: error.menssage });
  }
};

const getById = async (req, res) => {
  try {
    const tasksList = await Task.find();

    if (req.params.method == "update") {
      const task = await Task.findOne({ _id: req.params.id });
      res.render("index", { task, taskDelete: null, tasksList, message, type });
    } else {
      const taskDelete = await Task.findOne({ _id: req.params.id });
      res.render("index", { task: null, taskDelete, tasksList, message, type });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const updateOneTask = async (req, res) => {
  try {
    const task = req.body;
    await Task.updateOne({ _id: req.params.id }, task);
    message = "Tarefa atualizada com sucesso";
    type = "success";
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const deleteOneTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    message = "Tarefa apagada com sucesso";
    type = "success";
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

const taskCheck = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    task.check ? (task.check = false) : (task.check = true);

    /* if (task.check) {
      task.check = false;
    } else {
      task.check = true;
    } */

    await Task.updateOne({ _id: req.params.id }, task);
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getById,
  updateOneTask,
  deleteOneTask,
  taskCheck,
};

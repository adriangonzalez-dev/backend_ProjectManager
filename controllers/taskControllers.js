/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { request, response } = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project');

module.exports = {
  findAll: async (req = request, res = response) => {
    const { project } = req.query;
    try {
      const tasks = await Task.find().where('project').equals(project);
      return res.status(200).json({
        ok: true,
        msg: 'todas las tareas',
        tasks,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'Hubo un error',
      });
    }
  },
  findById: async (req = request, res = response) => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({
          ok: false,
          msg: 'No existe la tarea',
        });
      }

      return res.status(200).json({
        ok: true,
        task,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'Hubo un error',
      });
    }
  },
  createTask: async (req = request, res = response) => {
    const {
      name, description, dateExpire, priority, idProject,
    } = req.body;
    try {
      const task = new Task({
        name,
        description,
        dateExpire,
        priority,
        createdBy: req.user._id,
        project: idProject,
      });

      await task.save();

      const project = await Project.findById(idProject);

      project.tasks = [
        ...project.tasks,
        task._id,
      ];

      await project.save();
      return res.status(201).json({
        ok: true,
        task,
        msg: 'tarea guardada',
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'Tarea no creada',
      });
    }
  },
  updateTask: async (req = request, res = response) => {
    try {
      return res.status(201).json({
        ok: true,
        msg: 'proyecto actualizado',
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'token not send',
      });
    }
  },
  deleteTask: async (req = request, res = response) => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({
          ok: false,
          msg: 'La tarea no existe',
        });
      }

      await task.deleteOne();
      return res.status(200).json({
        ok: true,
        msg: 'Tarea eliminada',
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'token not valid',
      });
    }
  },
  changeState: async (req = request, res = response) => {
    const { id } = req.params;
    try {
      const task = await Task.findById(id);
      task.state = !task.state;
      await task.save();
      return res.status(200).json({
        ok: true,
        msg: 'tarea completada',
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'token not valid',
      });
    }
  },
};

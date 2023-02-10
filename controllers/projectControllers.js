/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const { request, response } = require('express');
const Project = require('../models/Project');
const User = require('../models/User');

module.exports = {
  findAll: async (req = request, res = response) => {
    try {
      // eslint-disable-next-line no-undef
      const projects = await Project.find().where('createdBy').equals(req.user);
      return res.status(200).json({
        ok: true,
        msg: 'todos los proyectos',
        projects,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
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
      const project = await Project.findById(id)
        .populate(['createdBy', 'collaborators', 'tasks']);

      if (!project) {
        return res.status(404).json({
          ok: false,
          msg: 'El proyecto no existe',
        });
      }

      if (req.user._id.toString() !== project.createdBy._id.toString()) {
        return res.status(404).json({
          ok: false,
          msg: 'El proyecto no existe en tu base de datos',
        });
      }

      return res.status(200).json({
        ok: true,
        project,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'Hubo un error',
      });
    }
  },
  create: async (req = request, res = response) => {
    const {
      name, description, client, dateExpire,
    } = req.body;

    try {
      const existProject = await Project.findOne({ name }).where('createdBy').equals(req.user);

      if (existProject) {
        return res.status(400).json({
          ok: false,
          msg: 'El proyecto ya existe',
        });
      }

      const project = new Project({
        name,
        description,
        client,
        dateExpire,
      });

      // eslint-disable-next-line no-underscore-dangle
      project.createdBy = req.user._id;

      await project.save();

      return res.status(201).json({
        ok: true,
        msg: 'Proyecto guardado',
        project,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'usuario not checked',
      });
    }
  },
  // eslint-disable-next-line no-unused-vars
  update: async (req = request, res = response) => {
    const { id } = req.params;
    const {
      name, description, client, dateExpire,
    } = req.body;

    try {
      const project = await Project.findById(id).where('createdBy').equals(req.user);

      if (project.name === name) {
        return res.status(400).json({
          ok: false,
          msg: 'El proyecto ya existe',
        });
      }

      if (!project) {
        return res.status(201).json({
          ok: false,
          msg: 'El proyecto no existe en tu base de datos',
        });
      }

      project.name = name || project.name;
      project.description = description || project.description;
      project.client = client || project.client;
      project.dataExpire = dateExpire || project.dataExpire;

      await project.save();

      return res.status(201).json({
        ok: true,
        msg: 'proyecto editado',
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'token not send',
      });
    }
  },
  projectDelete: async (req = request, res = response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        return res.status(400).json({
          ok: false,
          msg: 'El proyecto no existe',
        });
      }

      await project.deleteOne();

      return res.status(200).json({
        ok: true,
        msg: `El proyecto con ${id} fue eliminado correctamente`,
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'token not valid',
      });
    }
  },
  addColaborator: async (req = request, res = response) => {
    const { id } = req.params;
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          ok: false,
          msg: `El email ${email} no se encuentra registrado`,
        });
      }

      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({
          ok: false,
          msg: 'El proyecto no existe',
        });
      }

      if (project.collaborators.includes(user._id)) {
        return res.status(400).json({
          ok: false,
          msg: `El email ${email} ya fue agregado anteriormente`,
        });
      }

      project.collaborators = [
        ...project.collaborators,
        user._id,
      ];

      await project.save();

      return res.status(200).json({
        ok: true,
        msg: 'colaborator added',
      });
    } catch (error) {
      console.log(error);
      return res.status(error.status || 500).json({
        ok: false,
        msg: error.message || 'token not valid',
      });
    }
  },
  removeColaborator: async (req = request, res = response) => {
    const { id, userId } = req.params;
    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({
          ok: false,
          msg: 'El proyecto no existe',
        });
      }

      console.log(id, userId);
      if (!project.collaborators.includes(userId)) {
        return res.status(400).json({
          ok: false,
          msg: 'El email no es colaborador',
        });
      }

      // eslint-disable-next-line max-len
      project.collaborators = project.collaborators.filter((user) => user._id.toString() !== userId.toString());

      project.save();

      return res.status(200).json({
        ok: true,
        msg: 'Colaborador Eliminado',
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

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty */
/* eslint-disable camelcase */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
const { request, response } = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const cloudinary = require('cloudinary');
const Uploads = require('../models/Uploads');
const User = require('../models/User');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

module.exports = {
  async uploadFileProject(req = request, res = response) {
    const { id } = req.params;
    try {
      const { public_id, secure_url } = await cloudinary.v2.uploader.upload(req.file.path);

      const newFile = await Uploads.create({
        secure_url,
        public_id,
        project_id: id,
      });
      return res.status(201).json({
        msg: 'file ok',
        newFile,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getFilesProject(req = request, res = response) {
    const { id } = req.params;
    try {
      const images = await Uploads.find().where('project_id').equals(id);
      if (!images) {
        return res.status(404).json({
          ok: false,
          msg: 'No hay imagenes',
        });
      }
      return res.status(200).json({
        ok: 'true',
        images,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async uploadAvatar(req = request, res = response) {
    try {
      console.log(req.file);
      const { public_id, secure_url } = await cloudinary.v2.uploader.upload(req.file.path);
      const user = await User.findById(req.user._id);

      user.avatar = secure_url;
      user.id_avatar = public_id;

      await user.save();

      return res.status(201).json({
        msg: 'avatar ok',
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

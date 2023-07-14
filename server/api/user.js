const express = require('express');
const app = express.Router();
const { User } = require('../db');
const multer = require('multer');

// Create an instance of multer middleware
const upload = multer({ dest: 'uploads/' }); // Specify the directory where uploaded files will be stored

app.get('/', async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.send(user);
  } catch (er) {
    next(er);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(user);
  } catch (er) {
    next(er);
  }
});

app.post('/', async (req, res, next) => {
  try {
    console.log('route receiving:', req.body);
    res.status(201).send(await User.create(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.put('/:id', upload.single('avatar'), async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(404).send('User not found');
    } else { 
      const avatarPath = req.file.path;
      await user.update({ avatar: avatarPath });
      res.send(user);
    }
  } catch (er) {
    next(er);
  }
});

module.exports = app;

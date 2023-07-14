const express = require('express');
const app = express.Router();
const { Vehicle, User } = require('../db');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); 


app.get('/', async (req, res, next) => {
  try {
    const vehicles = await Vehicle.findAll({});
    res.send(vehicles);
  } catch (er) {
    next(er);
  }
});

app.get('/:id', async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findOne({ where: { id: req.params.id } });
    res.send(vehicle);
  } catch (er) {
    next(er);
  }
});

app.put('/:id', upload.single('image'), async (req, res, next) => {
    try {
      const vehicle = await Vehicle.findOne({ where: { id: req.params.id } });
      if (!vehicle) {
        res.status(404).send('Vehicle not found');
      } else {
        vehicle.make = req.body.make;
        vehicle.model = req.body.model;
        vehicle.year = req.body.year;
        vehicle.chargertype = req.body.chargertype;
  
        if (req.file) {
          vehicle.image = `uploads/${req.file.filename}`; // Store the file path in the database
        }
  
        await vehicle.save();
  
        res.send(vehicle);
      }
    } catch (error) {
      next(error);
    }
  });

app.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Vehicle.create(req.body));
  } catch (er) {
    next(er);
  }
});

module.exports = app;

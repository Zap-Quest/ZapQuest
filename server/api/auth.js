const express = require('express');
const app = express.Router();
const { User, Vehicle } = require('../db');

module.exports = app;

app.post('/', async(req, res, next)=> {
  try {
    res.send(await User.authenticate(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/', async(req, res, next)=> {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/signup', async(req, res, next)=> {
  try {
    const { username, password, email, vehicleMake, vehicleModel, vehicleYear, vehicleChargerType } = req.body;

    // Create user
    const user = await User.create({ username, password, email });

    // Create vehicle
    const vehicle = await Vehicle.create({ make: vehicleMake, model: vehicleModel, year: vehicleYear, chargertype: vehicleChargerType });

    // Associate vehicle with user
    await vehicle.setUser(user);

    res.send(await User.authenticate({ username, password }));
  }
  catch(ex){
    next(ex);
  }
});

app.put('/update', async(req, res, next)=> {
  try {
    res.send(await User.update(req.body));
  }
  catch(ex){
    next(ex);
  }
}
);


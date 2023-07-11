const express = require('express');
const app = express.Router();
const { Vehicle, User } = require('../db');

app.get('/', async(req, res, next)=>{
    try{
        const vehicles = await Vehicle.findAll({});
        res.send(vehicles);
    }catch(er){
        next(er);
    }
})
app.get('/:id', async(req, res, next)=>{
    try{
        const vehicle = await Vehicle.findOne({ where: { id: req.params.id } });
        res.send(vehicle);
    }catch(er){
        next(er);
    }
})
app.put('/:id', async(req, res, next)=>{
    try{
        const vehicle = await Vehicle.findOne({ where: { id: req.params.id } });
        if (!vehicle) {
            res.status(404).send('Vehicle not found');
        } else {
            const updatedVehicle = await vehicle.update(req.body);
            res.send(updatedVehicle);
        }
    }catch(er){
        next(er);
    }
})
app.post('/', async(req, res, next)=>{
    try{
        res.status(201).send(await Vehicle.create(req.body));
    } catch(er){
        next(er)
    }
})

module.exports = app;
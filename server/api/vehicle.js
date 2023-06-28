const express = require('express');
const app = express.Router();
const { Vehicle, User } = require('../db');

app.get('/', async(req, res, next)=>{
    try{
        const vehicles = await Vehicle.findAll({ include: User });
        res.send(vehicles);
    }catch(er){
        next(er);
    }
})
app.get('/:id', async(req, res, next)=>{
    try{
        const vehicle = await Vehicle.findOne({ where: { id: req.params.id }, include: User });
        res.send(vehicle);
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
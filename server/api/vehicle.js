const express = require('express');
const app = express.Router();
const { Vehicle } = require('../db');

app.get('/', async(req, res, next)=>{
    try{
        const reviews = await Vehicle.findAll();
        res.send(reviews);
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
app.get('/:id', async(req, res, next)=>{
    try{
        const reviews = await Vehicle.findAll({where:{vehicleId: req.params.id}});
        res.send(reviews);
    }catch(er){
        next(er);
    }
})





module.exports = app;
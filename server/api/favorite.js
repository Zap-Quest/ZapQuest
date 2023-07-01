const express = require('express');
const app = express.Router();
const { User, Favorite } = require('../db');

app.get('/', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getFavorite());
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/:id', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    console.log('stationId',req.params.id)
    console.log(Favorite);
    const favorite = await Favorite.findOne({
      where:{
        userId:user.id,
        stationId:req.params.id
      }
    })
    await favorite.destroy();
    res.send(favorite);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromFavorite(req.body));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToFavorite(req.body));
  }
  catch(ex){
    next(ex);
  }
});

module.exports = app;
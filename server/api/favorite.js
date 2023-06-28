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

app.post('/', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToFavorite(req.body));
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


module.exports = app;
const express = require('express');
const app = express.Router();
const { User } = require('../db');

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
    res.send(await User.create(req.body));
  }
  catch(ex){
    next(ex);
  }
}
);

app.put('/update', async(req, res, next)=> {
  try {
    res.send(await User.update(req.body));
  }
  catch(ex){
    next(ex);
  }
}
);


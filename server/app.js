const express = require('express');
require('dotenv').config();
const app = express();
const path = require('path');
app.use(express.json());
app.engine('html',require('ejs').renderFile);

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

//app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));
app.get('/', (req, res)=> res.render(path.join(__dirname, '../static/index.html'),{
    REACT_APP_GOOGLE_MAPS_API_KEY:process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
}));

app.use('/api/auth', require('./api/auth'));
app.use('/api/orders', require('./api/orders'));
app.use('/api/user', require('./api/user'));
app.use('/api/vehicle', require('./api/vehicle'))

module.exports = app;

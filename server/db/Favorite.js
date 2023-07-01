const conn = require('./conn');
const { DataTypes } = require('sequelize');
const { BOOLEAN, UUID, UUIDV4, INTEGER, STRING } = conn.Sequelize;

const Favorite = conn.define('favorite', {
  stationId:{
    type:INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  stationName:{
    type:STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  street:{
    type:STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  city:{
    type:STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },
  state:{
    type:STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
  },

});

module.exports = Favorite;

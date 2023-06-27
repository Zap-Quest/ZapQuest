const conn = require('./conn');
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const Vehicle = conn.define('vehicle', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  make: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  model: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  year: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  chargertype: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: STRING,
    defaultValue: '/static/images/Default Car.svg',
  },
});

module.exports = Vehicle;

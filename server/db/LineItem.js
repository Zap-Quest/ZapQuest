const conn = require('./conn');
const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const LineItem = conn.define('lineItem', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  location: {
    type: STRING,
  }
});

module.exports = LineItem;

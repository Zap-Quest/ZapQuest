const conn = require('./conn');
const { BOOLEAN, UUID, UUIDV4 } = conn.Sequelize;

const Favorite = conn.define('favorite', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  isFavorite: {
    type: BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  userId: {
    type: UUID,
    allowNull: false
  }
});

module.exports = Favorite;

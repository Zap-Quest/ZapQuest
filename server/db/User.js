const conn = require("./conn");
const { STRING, UUID, UUIDV4 } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
    unique: true,
  },
  address: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  avatar: {
    type: STRING,
    defaultValue: "../static/images/Default Avatar.svg",
  },
});

User.prototype.createFavorite = async function () {
  const favorite = await this.getFavorite();
  favorite.isFavorite = false;
  await favorite.save();
  return favorite;
};

User.prototype.getFavorite = async function () {
  let favorite = await conn.models.favorite.findAll({
    where: {
      userId: this.id,
    },
  });

  return favorite;
};

User.prototype.addToFavorite = async function (station) {
  console.log("station:", station);
  const favorite = conn.models.favorite.create({
    userId: this.id,
    stationId: station.stationId,
    stationName: station.stationName,
    street: station.street,
    city: station.city,
    state: station.state,
  });
  return favorite;
};

// User.prototype.removeFromFavorite = async function(station){
//   const favorite = await this.getFavorite();

//   return this.getFavorite();
// };

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;

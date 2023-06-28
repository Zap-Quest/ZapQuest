const conn = require('./conn');
const User = require('./User');
const Vehicle = require('./Vehicle');
const Favorite = require('./Favorite');
const LineItem  = require('./LineItem');

Vehicle.belongsTo(User);
LineItem.belongsTo(Favorite);
Favorite.hasMany(LineItem);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl, Essense] = await Promise.all([
    User.create({ 
      password: '123',
      username: 'moe',
      email: 'moed@gmail.com',
      address: '123 Main St, City A',
      avatar: '/static/images/Default Avatar.svg',
    }),
    User.create({ 
      password: '123',
      username: 'lucy',
      email: 'lucyb@gmail.com',
      address: '456 Elm St, City B',
      avatar: '/static/images/Default Avatar.svg',
    }),
    User.create({ 
      password: '123',
      username: 'larry',
      email: 'larryg@gmail.com',
      address: '789 Oak St, City C',
      avatar: '/static/images/Default Avatar.svg',
    }),
    User.create({ 
      password: '123',
      username: 'ethyl',
      email: 'ethylr@gmail.com',
      address: '987 Pine St, City D',
      avatar: '/static/images/Default Avatar.svg',
    }),
    Vehicle.create({ 
      make: 'Essense',
      model: 'Model 3',
      year: '2020',
      image: '/static/images/Default Car.svg',
      chargertype: 'CchadeMO' 
    }),
  ]);
};


module.exports = {
  syncAndSeed,
  User,
  Vehicle
};

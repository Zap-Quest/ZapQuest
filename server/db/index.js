const conn = require('./conn');
const User = require('./User');
const Vehicle = require('./Vehicle');
const Favorite = require('./Favorite');
const LineItem  = require('./LineItem');

User.hasMany(Favorite);
Favorite.belongsTo(User);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
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
  ]);

  const teslaVehicle = await Vehicle.create({ 
    make: 'Tesla',
    model: 'Model 3',
    year: '2020',
    image: '/static/images/Default Car.svg',
    chargertype: 'CchadeMO',
    userId: moe.id
  });

  const favorite1 = await Favorite.create({ 
    userId: moe.id,
    stationId:259592,
    stationName:"Navy Pier",
    street:"600 E Grand Ave",
    city:"Chicago",
    state:"IL",
  });

  const favorite2 = await Favorite.create({ 
    userId: moe.id,
    stationId:117262,
    stationName:"Northwestern Memorial HealthCare",
    street:"425 E Erie St",
    city:"Chicago",
    state:"IL",
  });


  const favorite3 = await Favorite.create({ 
    userId: moe.id,
    stationId:76523,
    stationName:"PRUDENTIALPLAZA STATION 01",
    street:"130 E Randolph St",
    city:"Chicago",
    state:"IL",
  });

  const favorite4 = await Favorite.create({ 
    userId: moe.id,
    stationId:193888,
    stationName:"ONNI ATRIUM STATION",
    street:"230 W Hill St",
    city:"Chicago",
    state:"IL",
  });
  const favorite5 = await Favorite.create({ 
    userId: moe.id,
    stationId:170750,
    stationName:"NICHE 905 EV STATION 02",
    street:"905 N Orleans St",
    city:"Chicago",
    state:"IL",
  });
  const favorite6 = await Favorite.create({ 
    userId: moe.id,
    stationId:205431,
    stationName:"Cityfront Place Parking Garage - 3rd Floor Left",
    street:"400 N. McClurg Court",
    city:"Chicago",
    state:"IL",
  });

  const favorite7 = await Favorite.create({ 
    userId: lucy.id,
    stationId:117262,
    stationName:"Northwestern Memorial HealthCare",
    street:"425 E Erie St",
    city:"Chicago",
    state:"IL",
  });
};


module.exports = {
  syncAndSeed,
  User,
  Vehicle,
  Favorite
};

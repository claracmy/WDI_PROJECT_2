const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });

// Require the model

const Website = require('../models/website');
const User = require('../models/user');

// Drop the model

Website.collection.drop();
User.collection.drop();

// Create the models

User
  .create([{
    firstname: 'Clara',
    lastname: 'Cheung',
    email: 'clara@clara.com',
    username: 'cc',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} users were created`);
    return Website
      .create([{
        name: 'Frogcase',
        description: 'Anti-gravity phonecases',
        url: 'https://www.frogcase.com',
        screenshotUrl: 'https://imgur.com/q8qT0eb.png'
      }, {
        name: 'myAllergy',
        description: 'The world\'s largest free-from community',
        url: 'https://www.myallergy.com',
        screenshotUrl: 'https://imgur.com/tGjrW9U.png'
      }, {
        name: 'Entocube',
        description: 'Home grown crickets from Espoo, Finland',
        url: 'https://www.entocube.com',
        screenshotUrl: 'https://imgur.com/m2F5hKz.png'
      }]);
  })
  .then(websites => console.log(`${websites.length} websites created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

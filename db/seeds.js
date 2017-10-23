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
        screenshotUrl: 'https://imgur.com/q8qT0eb.png',
        createdBy: users[0]
      }, {
        name: 'myAllergy',
        description: 'The world\'s largest free-from community',
        url: 'https://www.myallergy.com',
        screenshotUrl: 'https://imgur.com/tGjrW9U.png',
        createdBy: users[0]
      }, {
        name: 'Entocube',
        description: 'Home grown crickets from Espoo, Finland',
        url: 'https://www.entocube.com',
        screenshotUrl: 'https://imgur.com/m2F5hKz.png',
        createdBy: users[0]
      }, {
        name: 'PressPanda',
        description: 'Find the right journalist',
        url: 'https://www.presspanda.com',
        screenshotUrl: 'https://imgur.com/gtSHAz6.png',
        createdBy: users[0]
      }, {
        name: 'SkateDecor',
        description: 'Bespoke skateboard furniture',
        url: 'https://www.skatedecor.com',
        screenshotUrl: 'https://imgur.com/Li7JpfL.png',
        createdBy: users[0]
      }, {
        name: 'Dalou',
        description: 'Frische zmorge is buro',
        url: 'https://www.dalou.ch',
        screenshotUrl: 'https://imgur.com/gMAX8KI.png',
        createdBy: users[0]
      }, {
        name: 'Project Aqua',
        description: 'Micro-sharing for the future',
        url: 'https://www.project-aqua.ch',
        screenshotUrl: 'https://imgur.com/D1YzmEy.png',
        createdBy: users[0]
      }, {
        name: 'Faitron',
        description: 'The home appliance accelerator, building the world\'s fastest heating lunchbox',
        url: 'https://www.faitron.com',
        screenshotUrl: 'https://imgur.com/mpORRfn.png',
        createdBy: users[0]
      },{
        name: 'Modum',
        description: 'Data integrity for supply chain operations powered by blockchain',
        url: 'https://modum.io/',
        screenshotUrl: 'https://imgur.com/8nOGr0t.png',
        createdBy: users[0]
      }]);
  })
  .then(websites => console.log(`${websites.length} websites created!`))
  .catch(err => console.log(err))
  .finally(() => mongoose.connection.close());

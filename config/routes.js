const express = require('express');
const router  = express.Router();
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const websitesController = require('../controllers/websites');
// const secureRoute = require('../lib/secureRoute');

// A home route

// Website routes

router.route('/')
  .get(websitesController.index);

router.route('/websites/new')
  .get(websitesController.new)
  .post(websitesController.create);

router.route('/websites/:id')
  .get(websitesController.show);




// User routes
router.route('/register')
  .get(registrationsController.new)
  .post(registrationsController.create);

router.route('/login')
  .get(sessionsController.new)
  .post(sessionsController.create);

router.route('/logout')
  .get(sessionsController.delete);

router.route('/profile')
  .get(registrationsController.show)
  .put(registrationsController.update);

router.route('/profile/:id')
  .delete(registrationsController.delete);

router.route('/profile/edit')
  .get(registrationsController.edit);

module.exports = router;

const express = require('express');
const router  = express.Router();
const registrationsController = require('../controllers/registrations');
const sessionsController = require('../controllers/sessions');
const websitesController = require('../controllers/websites');
const secureRoute = require('../lib/secureRoute');

// Website routes

router.route('/')
  .get(websitesController.index);

router.route('/websites/new')
  .get(secureRoute, websitesController.new)
  .post(secureRoute, websitesController.create);

router.route('/websites/:id')
  .get(websitesController.show)
  .put(secureRoute, websitesController.update)
  .delete(secureRoute, websitesController.delete);

router.route('/websites/:id/edit')
  .get(secureRoute, websitesController.edit);

router.route('/websites/:id/comments')
  .post(secureRoute, websitesController.createComment);

router.route('/websites/:id/comments/:commentId')
  .delete(secureRoute, websitesController.deleteComment);

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
  .get(secureRoute, registrationsController.show)
  .put(secureRoute, registrationsController.update);

router.route('/profile/:id')
  .delete(secureRoute, registrationsController.delete);

router.route('/profile/edit')
  .get(secureRoute, registrationsController.edit);

module.exports = router;

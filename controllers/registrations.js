const User = require('../models/user');
const Website = require('../models/website');

function registrationNew(req, res) {
  res.render('registrations/new');
}

function registrationCreate(req, res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `Thanks for registering, ${user.username}!`);
      res.redirect('/login');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(401).render('registrations/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

function registrationShow(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      Website
        .find()
        .exec()
        .then((website) => {
          if(!website) res.notFound();
          res.render('registrations/show', { user, website });
        });
    })
    .catch(next);
}

function registrationEdit(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      res.render('registrations/edit', { user });
    })
    .catch(next);
}

function registrationUpdate(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      for(const field in req.body) {
        user[field] = req.body[field];
      }
      return user.save();
    })
    .then((user) => {
      req.flash('success', 'Information updated!');
      res.redirect(`/profile/${user.id}`);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registrations/update', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

function registrationDelete(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      return user.remove();
    })
    .then(() => {
      req.flash('success', 'Sorry to see you go!');
      req.session.regenerate(() => res.redirect('/'));
    });
}

module.exports = {
  new: registrationNew,
  create: registrationCreate,
  show: registrationShow,
  edit: registrationEdit,
  update: registrationUpdate,
  delete: registrationDelete
};

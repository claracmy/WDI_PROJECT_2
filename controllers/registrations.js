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
        return res.status(400).render('registrations/new', { message: 'Passwords do not match' });
      }
      res.status(500).end();
    });
}

function registrationShow(req, res) {
  res.render('registrations/show');
}

function registrationEdit(req, res) {
  res.render('registrations/edit');
}

function registrationUpdate(req, res) {
  User
    .findOne({ username: req.body.username })
    .exec()
    .then(user => {
      for(const field in req.body) {
        user[field] = req.body[field];
      }
      return user.save();
    })
    .then(() => {
      req.flash('success', 'Information updated!');
      res.redirect('/profile');
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

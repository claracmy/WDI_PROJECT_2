const User = require('../models/user');

//Logging in

function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res) {
  User
    .findOne({ username: req.body.username })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        return res.status(401).render('sessions/new', { message: 'Unrecognised credentials' });
      }

      req.session.userId = user._id;
      req.session.isAuthenticated = true;
      req.user = user;

      req.flash('success', `Welcome back, ${user.username}!`);
      res.redirect('/');
    });
}

//Logging out
function sessionsDelete(req, res) {
  req.flash('success', 'You successfully logged out.');
  req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};

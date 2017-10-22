const Website = require('../models/website');

function websiteIndex(req, res) {
  Website
    .find()
    .exec()
    .then(websites => res.render('homepage', {websites}))
    .catch(err => res.render('error', {error: err.msg}));
}

function websiteNew(req, res) {
  res.render('websites/new');
}

function websiteCreate(req, res) {
  Website
    .create(req.body)
    .then(() => {
      req.flash('info', 'Your website has been added');
      res.redirect('/');
    });
}

function websiteShow(req,res) {
  Website
    .findById(req.params.id)
    .exec()
    .then((website) => {
      if(!website) return res.status(404).end('Not found');
      res.render('websites/show', { website });
    });
}


module.exports = {
  index: websiteIndex,
  new: websiteNew,
  create: websiteCreate,
  show: websiteShow
};

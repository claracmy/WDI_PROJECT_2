const Website = require('../models/website');

function websiteIndex(req, res) {
  Website
    .find()
    .exec()
    .then(websites => res.render('homepage', { websites }))
    .catch(err => res.render('error', { error: err.msg }));
}

function websiteNew(req, res) {
  res.render('websites/new');
}

function websiteCreate(req, res, next) {
  req.body.createdBy = req.user;
  Website
    .create(req.body)
    .then(() => {
      req.flash('info', 'Your website has been added');
      res.redirect('/');
    })
    .catch(next);
}

function websiteShow(req, res) {
  Website
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then((website) => {
      if(!website) res.notFound();
      res.render('websites/show', { website });
    });
}

function websiteEdit(req, res, next) {
  Website
    .findById(req.params.id)
    .exec()
    .then(website => {
      if(!website) return res.redirect();
      if(!website.belongsTo(req.user)) return res.unauthroized('Permission denied');
      return res.render('websites/edit', { website });
    })
    .catch(next);
}

function websiteUpdate(req, res, next) {
  Website
    .findById(req.params.id)
    .exec()
    .then(website => {
      if(!website) return res.notFound();
      if(!website.belongsTo(req.user)) return res.unauthorized('Permission denied');
      for(const field in req.body) {
        website[field] = req.body[field];
      }
      req.flash('success', 'Website updated');
      return website.save();
    })
    .then(() =>
      res.redirect(`/websites/${req.params.id}`))
    .catch(next);
}

function websiteDelete(req, res, next) {
  Website
    .findById(req.params.id)
    .exec()
    .then(website => {
      if(!website) return res.notFound();
      if(!website.belongsTo(req.user)) return res.unauthroized('Permission denied');
      req.flash('success', 'Website deleted');
      return website.remove();
    })
    .then(() => res.redirect('/'))
    .catch(next);
}

//comments

function createCommentRoute(req, res, next) {
  req.body.createdBy = req.user;

  Website
    .findById(req.params.id)
    .exec()
    .then((website) => {
      if(!website) return res.notFound();

      website.comments.push(req.body);
      return website.save();
    })
    .then((website) => res.redirect(`/websites/${website.id}`))
    .catch(next);
}

function deleteCommentRoute(req, res, next) {
  Website
    .findById(req.params.id)
    .exec()
    .then((website)=> {
      if(!website) return res.notFound();
      const comment = website.comments.id(req.params.commentId);
      req.flash('success', 'Comment deleted');
      comment.remove();

      return website.save();
    })
    .then((website) => res.redirect(`/websites/${website.id}`))
    .catch(next);
}


module.exports = {
  index: websiteIndex,
  new: websiteNew,
  create: websiteCreate,
  show: websiteShow,
  edit: websiteEdit,
  update: websiteUpdate,
  delete: websiteDelete,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};

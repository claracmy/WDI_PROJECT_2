function staticsAbout(req, res) {
  res.render('statics/about');
}

module.exports = {
  about: staticsAbout
};

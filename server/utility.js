exports.checkUser = function(req, res, next) {
  console.log(req.session);
  if (req.session && req.session.username) {
    return next();
  }
  else {
    return res.render('login');
  }
}
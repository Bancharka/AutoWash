function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/");
  }
  next();
}

function isNotAuthenticated(req, res, next) {
  if (req.session.user) {
    return res.redirect("/");
  }
  next();
}

function isAdmin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/");
  }
  if (!req.session.user.isAdmin) {
    return res.redirect("/dashboard");
  }
  next();
}

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
  isAdmin,
};

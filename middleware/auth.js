function isAuthenticated(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

function isNotAuthenticated(req, res, next) {
  if (req.session.user) {
    return res.redirect("/login");
  }
  next();
}

function isAdmin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  if (!req.session.user.isAdmin) {
    return res.redirect("/");
  }
  next();
}

function isUser(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  if (req.session.user.isAdmin) {
    return res.redirect("/");
  }
  next();
}

module.exports = {
  isAuthenticated,
  isNotAuthenticated,
  isAdmin,
  isUser,
};

function isAuthenticated(req, res, next) {
	if (!req.session || !req.session.user) {
		return res.redirect("/");
	}
	next();
}

function isNotAuthenticated(req, res, next) {
	if (req.session && req.session.user) {
		return res.redirect("/");
	}
	next();
}

module.exports = {
	isAuthenticated,
	isNotAuthenticated,
};

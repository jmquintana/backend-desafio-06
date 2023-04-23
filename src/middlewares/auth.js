function checkLogin(req, res, next) {
	console.log(req.session.user);
	if (!req.session.user) return res.redirect("/login");
	next();
}

function checkLogged(req, res, next) {
	console.log(req.session.user);
	if (req.session.user) return res.redirect("/login");
	next();
}

function checkSession(req, res, next) {
	console.log(req.session.user);
	if (req.session.user) return res.redirect("/profile");
	next();
}

export { checkLogged, checkLogin, checkSession };

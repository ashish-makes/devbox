function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next(); // User is authenticated, proceed
    } else {
        res.redirect('/auth/login'); // Redirect to login
    }
}

function ensureAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') {
        return next(); // User is an admin, proceed
    } else {
        res.status(403).send('Access denied. Admins only.'); // Forbidden for non-admins
    }
}

module.exports = {
    ensureAuthenticated,
    ensureAdmin,
};

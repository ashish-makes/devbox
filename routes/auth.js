const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');

// GET /login - Render login page
router.get('/login', (req, res) => {
    res.render('pages/login', { title: 'Login' });
});

// POST /login - Handle login form submission
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid username or password');
        }

        // Log both the plain password and the hashed password for debugging
        console.log('Password from request:', password);
        console.log('Stored hashed password:', user.password);

        const isMatch = await user.comparePassword(password);
        console.log('Password comparison result:', isMatch);

        if (!isMatch) {
            return res.status(401).send('Invalid username or password');
        }

        // Save user session with role
        req.session.user = { id: user._id, username: user.username, role: user.role };
        res.redirect('/resources');
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).send('Internal Server Error');
    }
});

// GET /signup - Render signup page
router.get('/signup', (req, res) => {
    res.render('pages/signup', { title: 'Sign Up' });
});

// POST /signup - Handle signup form submission
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const role = 'user';

    try {
        if (!username || !password || !role) {
            return res.status(400).send('All fields are required.');
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send('Username already taken.');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            username,
            password,
            role
        });
        console.log('Hashed password during signup:', hashedPassword);

        // Save user to the database
        await newUser.save();

        res.redirect('/auth/login');  // Redirect to login page after successful signup
    } catch (err) {
        console.error('Error signing up:', err);
        res.status(500).send('Internal server error');
    }
});

// GET /logout - Logout the user
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login'); // Redirect to login after logout
    });
});

// GET /auth/github - Redirect to GitHub login
router.get('/github', passport.authenticate('github', {
    scope: ['user:email'] // Request email permission from GitHub
}));

// GET /auth/github/callback - GitHub callback route
router.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/auth/login' // Redirect to login if authentication fails
}), async (req, res) => {
    // Successful authentication
    const githubUser = req.user;

    // Check if user already exists in the database (based on GitHub ID)
    let user = await User.findOne({ githubId: githubUser.id });
    if (!user) {
        // If the user doesn't exist, create a new user
        user = new User({
            username: githubUser.username,
            githubId: githubUser.id,
            role: 'user' // Default role, can be changed
        });

        await user.save();
    }

    // Save user session
    req.session.user = { id: user._id, username: user.username, role: user.role };

    // Redirect to resources page or any other page you want
    res.redirect('/resources');
});

module.exports = router;

const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        // Generate a JWT token for the user
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Redirect the user to the frontend dashboard with the token
        res.redirect(`http://localhost:3000/dashboard?token=${token}`);
    }
);

module.exports = router;
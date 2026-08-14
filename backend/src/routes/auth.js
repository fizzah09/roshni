const express = require('express');
const router = express.Router();
const passport = require('../auth/googleStrategy');

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Step 1 — redirect user to Google consent screen
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Step 2 — Google redirects back here with a code
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}/?error=auth_failed`,
  }),
  (req, res) => {
    // Successful login — bounce back to the frontend with a success flag
    res.redirect(`${FRONTEND_URL}/?auth=success&name=${encodeURIComponent(req.user.displayName)}`);
  }
);

// Current session user (for the front-end to check login state)
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      authenticated: true,
      user: {
        id: req.user.id,
        displayName: req.user.displayName,
        email: req.user.email,
        avatarUrl: req.user.avatarUrl,
      },
    });
  }
  res.json({ authenticated: false });
});

// Sign-out
router.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ success: true });
    });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const verify = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.put('/profile', verify, auth.updateProfile);
router.post('/forgot-password', auth.forgotPassword);
router.post('/reset-password', auth.resetPassword);
router.get('/profile', authMiddleware, getProfile);

module.exports = router;

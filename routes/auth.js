const express = require('express');
const router = express.Router();
const {signup, login, resetPassword, forgotPassword} = require('../controllers/authController')

router.post('/signup', signup);
router.post('/login', login);
router.post('/resetpassword', resetPassword);
router.post('/forgotpassword', forgotPassword);

module.exports = router;
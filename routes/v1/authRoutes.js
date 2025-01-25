const express = require('express');
const { pharmacyLoginHandler, pharmacyRegisterHandler } = require('../../controllers/authController');

const router = express.Router();

router.post('/register', pharmacyRegisterHandler);

router.post('/login', pharmacyLoginHandler);

module.exports = router;

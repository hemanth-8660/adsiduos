const users = require('../controllers/users');
const express = require('express');
const router = express.Router();

router.route('/register').post(users.register);
router.route('/login').post(users.login);

module.exports = router;
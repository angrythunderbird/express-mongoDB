const userController = require('../controllers/userController');
const express = require('express');

const router = express.Router();
const getUser = new userController();

router.route('/').get(getUser.getAllUsers).patch(getUser.createUser);

router.route('/:id').get(getUser.getUserByID);

module.exports = router;

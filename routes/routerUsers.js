const GetApiData = require('../dataGetter');
const express = require('express');

const router = express.Router();
const getData = new GetApiData();

router.route('/').get(getData.getAllUsers).patch(getData.createUser);

router.route('/:id').get(getData.getUserByID);

module.exports = router;

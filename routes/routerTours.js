const GetApiData = require('../dataGetter');
const express = require('express');

const router = express.Router();
const getData = new GetApiData();

router.route('/').get(getData.getAllTours).post(getData.createTour);

router
  .route('/:id')
  .get(getData.getTourByID)
  .patch(getData.updateTour)
  .delete(getData.removeTour);

module.exports = router;

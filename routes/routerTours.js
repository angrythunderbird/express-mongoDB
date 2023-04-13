const tourController = require('../controllers/tourController');
const express = require('express');

const router = express.Router();
const getTour = new tourController();

router.param('id', getTour.checkID);

router
  .route('/')
  .get(getTour.getAllTours)
  .post(getTour.checkPostBody, getTour.createTour);

router
  .route('/:id')
  .get(getTour.getTourByID)
  .patch(getTour.checkPatchBody, getTour.updateTour)
  .delete(getTour.removeTour);

module.exports = router;

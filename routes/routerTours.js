const tourController = require('../controllers/tourController');
const express = require('express');

const router = express.Router();
const getTour = new tourController();

router.route('/').get(getTour.getAllTours).post(getTour.createTour);

router
  .route('/:id')
  .get(getTour.getTourByID)
  .patch(getTour.updateTour)
  .delete(getTour.removeTour);

module.exports = router;

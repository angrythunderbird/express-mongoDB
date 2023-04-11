const GetApiData = require('./dataGetter');
const fs = require('fs');
const express = require('express');

const getData = new GetApiData();
const app = express();

app.use(express.json());

app.route('/api/v1/tours').get(getData.getAllTours).post(getData.createTour);

app
  .route('/api/v1/tours/:id')
  .get(getData.getTourByID)
  .patch(getData.updateTour)
  .delete(getData.removeTour);

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

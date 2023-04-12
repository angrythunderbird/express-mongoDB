const express = require('express');

const routerTours = require('./routes/routerTours');
const routerUsers = require('./routes/routerUsers');

const app = express();

app.use(express.json());

app.use('/api/v1/tours', routerTours);
app.use('/api/v1/users', routerUsers);

// app.route('/api/v1/tours').get(getData.getAllTours).post(getData.createTour);

// app
//   .route('/api/v1/tours/:id')
//   .get(getData.getTourByID)
//   .patch(getData.updateTour)
//   .delete(getData.removeTour);

// app.route('/api/v1/users').get(getData.getAllUsers);

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

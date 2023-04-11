const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourByID = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const reqBodyKeys = Object.keys(req.body);

  tours.map((el) => {
    if (el.id === id) {
      reqBodyKeys.map((reqKey) => {
        el[reqKey] = req.body[reqKey];
      });
    }
  });

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tours,
        },
      });
    }
  );
};

const removeTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const reqBodyKeys = Object.keys(req.body);

  // switch case
  if (reqBodyKeys.length) {
    tours.map((el) => {
      if (el.id === id) {
        reqBodyKeys.map((reqKey) => {
          delete el[reqKey];
        });
      }
    });

    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(204).json({
          status: 'success',
          data: null,
        });
      }
    );
  } else {
    tours.map((el, n) => {
      if (el.id === id) {
        const updTours = [...tours.slice(0, n), ...tours.slice(n + 1)];

        fs.writeFile(
          `${__dirname}/dev-data/data/tours-simple.json`,
          JSON.stringify(updTours),
          (err) => {
            res.status(204).json({
              status: 'success',
              data: null,
            });
          }
        );
        return;
      }
    });
  }
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTourByID)
  .patch(updateTour)
  .delete(removeTour);

const port = 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

const fs = require('fs');

module.exports = class {
  tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

  checkID = (req, res, next, val) => {
    const id = req.params.id * 1;

    const tour = this.tours.find((el) => el.id === id);

    if (req.params.id * 1 > this.tours.length || !tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }
    next();
  };

  checkPostBody = (req, res, next) => {
    const { name, price } = req.body;

    console.log(name, price);

    if (name === '' || price === 0) {
      return res.status(400).json({
        status: 'bad request',
        message: 'check name and price data',
      });
    }

    next();
  };

  checkPatchBody = (req, res, next) => {
    console.log(Object.values(req.body).length);
    if (!Object.values(req.body).length) {
      return res.status(400).json({
        status: 'bad request',
        message: 'check data',
      });
    }

    next();
  };

  getAllTours = (req, res) => {
    res.status(200).json({
      status: 'success',
      results: this.tours.length,
      data: {
        tours: this.tours,
      },
    });
  };

  getTourByID = (req, res) => {
    const id = req.params.id * 1;
    const tour = this.tours.find((el) => el.id === id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  };

  createTour = (req, res) => {
    const newId = this.tours[this.tours.length - 1].id + 1;
    const newTour = { id: newId, ...req.body };

    this.tours.push(newTour);

    fs.writeFile(
      `${__dirname}/../dev-data/data/tours-simple.json`,
      JSON.stringify(this.tours),
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

  updateTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = this.tours.find((el) => el.id === id);

    const reqBodyKeys = Object.keys(req.body);

    this.tours.map((el) => {
      if (el.id === id) {
        reqBodyKeys.map((reqKey) => {
          el[reqKey] = req.body[reqKey];
        });
      }
    });

    fs.writeFile(
      `${__dirname}/../dev-data/data/tours-simple.json`,
      JSON.stringify(this.tours),
      (err) => {
        res.status(200).json({
          status: 'success',
          data: {
            tours: this.tours,
          },
        });
      }
    );
  };

  removeTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = this.tours.find((el) => el.id === id);

    const reqBodyKeys = Object.keys(req.body);

    switch (reqBodyKeys.length) {
      case 0:
        this.tours.map((el, n) => {
          if (el.id === id) {
            const updTours = [
              ...this.tours.slice(0, n),
              ...this.tours.slice(n + 1),
            ];

            fs.writeFile(
              `${__dirname}/../dev-data/data/tours-simple.json`,
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
        break;
      default:
        this.tours.map((el) => {
          if (el.id === id) {
            reqBodyKeys.map((reqKey) => {
              delete el[reqKey];
            });
          }
        });

        fs.writeFile(
          `${__dirname}/../dev-data/data/tours-simple.json`,
          JSON.stringify(this.tours),
          (err) => {
            res.status(204).json({
              status: 'success',
              data: null,
            });
          }
        );
    }
  };
};

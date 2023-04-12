const fs = require('fs');

module.exports = class {
  tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
  );

  users = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/users.json`));

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

  createTour = (req, res) => {
    const newId = this.tours[this.tours.length - 1].id + 1;
    // Refactor to spread syntax
    const newTour = { id: newId, ...req.body };

    this.tours.push(newTour);

    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
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

    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }

    const reqBodyKeys = Object.keys(req.body);

    this.tours.map((el) => {
      if (el.id === id) {
        reqBodyKeys.map((reqKey) => {
          el[reqKey] = req.body[reqKey];
        });
      }
    });

    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
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

    if (req.params.id * 1 > this.tours.length) {
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
    console.log(reqBodyKeys.length);

    switch (reqBodyKeys.length) {
      case 0:
        this.tours.map((el, n) => {
          if (el.id === id) {
            const updTours = [
              ...this.tours.slice(0, n),
              ...this.tours.slice(n + 1),
            ];

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
          `${__dirname}/dev-data/data/tours-simple.json`,
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

  getAllUsers = (req, res) => {
    res.status(200).json({
      status: 'success',
      results: this.users.length,
      data: {
        users: this.users,
      },
    });
  };

  getUserByID = (req, res) => {
    const id = req.params.id * 1;
    const user = this.users[id - 1];

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'Invalid ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  };

  createUser = (req, res) => {
    const newId = this.users[this.users.length - 1].id + 1;

    const newUser = { id: newId, ...req.body };

    this.users.push(newUser);

    fs.writeFile(
      `${__dirname}/dev-data/data/users.json`,
      JSON.stringify(this.users),
      (err) => {
        res.status(201).json({
          status: 'success',
          data: {
            user: newUser,
          },
        });
      }
    );
  };
};

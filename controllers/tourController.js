const clientDB = require('../clientDB');

module.exports = class {
  checkPostBody(req, res, next) {
    const { name, price } = req.body;

    if (name === '' || price === 0) {
      return res.status(400).json({
        status: 'bad request',
        message: 'check name and price data',
      });
    }

    next();
  }

  checkPatchBody(req, res, next) {
    if (!Object.values(req.body).length) {
      return res.status(400).json({
        status: 'bad request',
        message: 'check data',
      });
    }

    next();
  }

  async getAllTours(req, res) {
    try {
      await clientDB.connect();
      const database = clientDB.db('t-app');
      const toursCol = database.collection('tours');
      const cursor = toursCol.find({});
      const tours = await cursor.next();

      await cursor.close();
      res.status(200).json({
        status: 'success',
        results: await toursCol.countDocuments(),
        data: {
          tours,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      await clientDB.close();
    }
  }

  getTourByID(req, res) {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  }

  createTour(req, res) {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = { id: newId, ...req.body };

    tours.push(newTour);

    fs.writeFile(
      `${__dirname}/../dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        if (err) {
          return;
        }
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
      }
    );
  }

  updateTour(req, res) {
    const id = req.params.id * 1;

    const reqBodyKeys = Object.keys(req.body);

    tours.map((el) => {
      if (el.id === id) {
        reqBodyKeys.map((reqKey) => {
          el[reqKey] = req.body[reqKey];
        });
      }
    });

    fs.writeFile(
      `${__dirname}/../dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        if (err) {
          return;
        }
        res.status(200).json({
          status: 'success',
          data: {
            tours: tours,
          },
        });
      }
    );
  }

  removeTour(req, res) {
    const id = req.params.id * 1;

    const reqBodyKeys = Object.keys(req.body);

    switch (reqBodyKeys.length) {
      case 0:
        tours.map((el, n) => {
          if (el.id === id) {
            const updTours = [...tours.slice(0, n), ...tours.slice(n + 1)];

            fs.writeFile(
              `${__dirname}/../dev-data/data/tours-simple.json`,
              JSON.stringify(updTours),
              (err) => {
                if (err) {
                  return;
                }
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
        tours.map((el) => {
          if (el.id === id) {
            reqBodyKeys.map((reqKey) => {
              delete el[reqKey];
            });
          }
        });

        fs.writeFile(
          `${__dirname}/../dev-data/data/tours-simple.json`,
          JSON.stringify(tours),
          (err) => {
            if (err) {
              return;
            }
            res.status(204).json({
              status: 'success',
              data: null,
            });
          }
        );
    }
  }
};

// exports.checkID = (req, res, next, val) => {
//   const id = val * 1;

//   const tour = tours.find((el) => el.id === id);

//   if (id > tours.length || !tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkPostBody = (req, res, next) => {
//   const { name, price } = req.body;

//   if (name === '' || price === 0) {
//     return res.status(400).json({
//       status: 'bad request',
//       message: 'check name and price data',
//     });
//   }

//   next();
// };

// exports.checkPatchBody = (req, res, next) => {
//   if (!Object.values(req.body).length) {
//     return res.status(400).json({
//       status: 'bad request',
//       message: 'check data',
//     });
//   }

//   next();
// };

// exports.getAllTours = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
// };

// exports.getTourByID = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// };

// exports.createTour = (req, res) => {
//   const newId = tours[tours.length - 1].id + 1;
//   const newTour = { id: newId, ...req.body };

//   tours.push(newTour);

//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       if (err) {
//         return;
//       }
//       res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// };

// exports.updateTour = (req, res) => {
//   const id = req.params.id * 1;

//   const reqBodyKeys = Object.keys(req.body);

//   tours.map((el) => {
//     if (el.id === id) {
//       reqBodyKeys.map((reqKey) => {
//         el[reqKey] = req.body[reqKey];
//       });
//     }
//   });

//   fs.writeFile(
//     `${__dirname}/../dev-data/data/tours-simple.json`,
//     JSON.stringify(tours),
//     (err) => {
//       if (err) {
//         return;
//       }
//       res.status(200).json({
//         status: 'success',
//         data: {
//           tours: tours,
//         },
//       });
//     }
//   );
// };

// exports.removeTour = (req, res) => {
//   const id = req.params.id * 1;

//   const reqBodyKeys = Object.keys(req.body);

//   switch (reqBodyKeys.length) {
//     case 0:
//       tours.map((el, n) => {
//         if (el.id === id) {
//           const updTours = [...tours.slice(0, n), ...tours.slice(n + 1)];

//           fs.writeFile(
//             `${__dirname}/../dev-data/data/tours-simple.json`,
//             JSON.stringify(updTours),
//             (err) => {
//               if (err) {
//                 return;
//               }
//               res.status(204).json({
//                 status: 'success',
//                 data: null,
//               });
//             }
//           );
//           return;
//         }
//       });
//       break;
//     default:
//       tours.map((el) => {
//         if (el.id === id) {
//           reqBodyKeys.map((reqKey) => {
//             delete el[reqKey];
//           });
//         }
//       });

//       fs.writeFile(
//         `${__dirname}/../dev-data/data/tours-simple.json`,
//         JSON.stringify(tours),
//         (err) => {
//           if (err) {
//             return;
//           }
//           res.status(204).json({
//             status: 'success',
//             data: null,
//           });
//         }
//       );
//   }
// };

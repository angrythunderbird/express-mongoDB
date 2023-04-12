const fs = require('fs');

module.exports = class {
  users = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
  );

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
      `${__dirname}/../dev-data/data/users.json`,
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

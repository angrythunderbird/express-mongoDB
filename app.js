const express = require('express');

const routerTours = require('./routes/routerTours');
const routerUsers = require('./routes/routerUsers');

const app = express();

app.use(express.json());

app.use('/api/v1/tours', routerTours);
app.use('/api/v1/users', routerUsers);

module.exports = app;

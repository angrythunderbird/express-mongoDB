const dotenv = require('dotenv').config({path: './config.env'});
const app = require('./app');

const port = process.env.PORT || 3000;
console.log(port);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

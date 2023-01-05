const express = require('express');
require('dotenv').config();

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', routes);

app.use(function (req, res) {
  res.status(404);
});

app.listen(5000, () => {
  console.log(`Server Started at ${5000} - ${process.env.DATABASE_URL}`);
});

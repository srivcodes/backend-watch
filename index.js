const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const videos = require('./routes/videos.router');

const dbConnection = require('./db/dbConnect.js');
const route404Handler = require('./middlewares/route404Handler');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

dbConnection();

app.get('/', (_, res) => {
  res.send('Welcome to Watch API');
});
app.get('/hello', (_, res) => {
  res.json({
    success: true,
    message: "Hey, What's up?"
  });
});

// Routing endpoints to their controllers
app.use('/videos', videos);

app.use(route404Handler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`MODE: `, process.env.NODE_ENV);
  console.log(`server running on http://localhost:${PORT}`);
});

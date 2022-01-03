const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const users = require('./routes/users.router');
const videos = require('./routes/videos.router');
const playlists = require('./routes/playlists.router');

const dbConnection = require('./db/dbConnect.js');
const userAuthorization = require('./middlewares/userAuthorization');
const route404Handler = require('./middlewares/route404Handler');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 8000;
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

dbConnection();

app.get('/', (_, res) => {
  res.send('This a message sent by Watch project API');
});
app.get('/hello', (_, res) => {
  res.json({
    success: true,
    message: 'This is a test message to say hello'
  });
});

app.use('/videos', videos);
app.use('/users', users);

//User Authorization Middleware
app.use(userAuthorization);
//Protected Route(needs to be authenticated before getting accessed)
app.use('/playlists', playlists);

// 404 Route Handler
app.use(route404Handler);

//Error Handeler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});

const express = require('express');
const router = express.Router();

const {
  getAllVideos,
  addNewVideo,
  getVideoById
} = require('../controllers/videos.controller');

router.route('/').get(getAllVideos).post(addNewVideo);

router.route('/:vidId').get(getVideoById);
module.exports = router;

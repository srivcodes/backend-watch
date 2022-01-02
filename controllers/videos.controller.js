const { Video } = require('../models/video.model');

const getAllVideos = async (_, res) => {
  try {
    const videos = await Video.find({});

    res.status(200).json({ data: videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        'Server Error, request failed. See error message for more details.',
      errorMessage: error.message
    });
  }
};

const addNewVideo = async (req, res) => {
  try {
    const videoDetails = req.body;
    const NewVideo = new Video(videoDetails);
    const savedVideo = await NewVideo.save();

    res.status(201).json({ data: savedVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        'Server Error, request failed. See error message for more details.',
      errorMessage: error.message
    });
  }
};

const getVideoById = async (req, res) => {
  try {
    const { vidId } = req.params;
    const videoFound = await Video.findById(vidId);
    videoFound
      ? res.status(200).json({ data: videoFound })
      : res.status(404).json({ message: 'video not found in Database' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        'Server Error, request failed. See error message for more details.',
      errorMessage: error.message
    });
  }
};

module.exports = { getAllVideos, addNewVideo, getVideoById };

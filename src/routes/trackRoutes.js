const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Track = mongoose.model("Track");
const requireAuth = require('../middlewares/requireAuth');

router.use(requireAuth);

router.get('/tracks', async (req, res) => {
  const userId = req.user._id;
  const tracks = await Track.find({ userId });
  res.send(tracks);
});

router.post('/tracks', async (req, res) => {
  try {
    const { name, locations } = req.body;
    if(!name || !locations) return res.status(422).send({ error: 'You must provide a name and locations' });
    const track = new Track({ name, locations, userId: req.user._id });
    await track.save();
    res.send(track);
  } catch (err) {
    return res.status(422).send({error: err.message})
  }
})

module.exports = router;
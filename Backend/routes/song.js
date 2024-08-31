const express = require("express");
const songmodel = require("../models/models");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [totalSongs, artists, albums, genres] = await Promise.all([
      songmodel.countDocuments(),
      songmodel.distinct("artist"),
      songmodel.distinct("album"),
      songmodel.distinct("genre"),
    ]);

    const totalArtists = artists.length;
    const totalAlbums = albums.length;
    const totalGenres = genres.length;

    res.status(200).json({
      status: 200,
      data: {
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
        artists,
        albums,
        genres,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/songs", async (req, res) => {
  console.log("this is songs router");
  const songs = await songmodel.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: 200,
    data: songs,
  });
});

router.get("/song/:id", async (req, res) => {
  const { id } = req.params;
  console.log("this is song id: ", id);
  const songs = await songmodel.findOne({ _id: id });
  console.log("this is song : ", songs);
  res.status(200).json({
    status: 200,
    data: songs,
  });
});
router.get("/album/:album", async (req, res) => {
  const { album } = req.params;
  const songs = await songmodel
    .find({ album: album.toLowerCase() })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 200,
    data: songs,
  });
});
router.get("/title/:title", async (req, res) => {
  const { title } = req.params;
  const songs = await songmodel
    .find({ title: title.toLowerCase() })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 200,
    data: songs,
  });
});
router.get("/artist/:artist", async (req, res) => {
  const { artist } = req.params;
  const songs = await songmodel
    .find({ artist: artist.toLowerCase() })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 200,
    data: songs,
  });
});
router.get("/genre/:genre", async (req, res) => {
  const { genre } = req.params;
  const songs = await songmodel
    .find({ genre: genre.toLowerCase() })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 200,
    data: songs,
  });
});
router.post("/createsong", async (req, res) => {
  const { title, artist, album, genre } = req.body;
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!artist) {
    emptyFields.push("artist");
  }
  if (!album) {
    emptyFields.push("album");
  }
  if (!genre) {
    emptyFields.push("genre");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const song = await songmodel.create({ title, artist, album, genre });
    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put("/updatesong/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such workout" });
  }

  try {
    const song = await songmodel.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
        updatedAt: new Date(),
      }
    );
    if (!song) return res.status(404).json({ error: "No such song" });

    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such song" });
  }

  const song = await songmodel.findOneAndDelete({ _id: id });

  if (!song) {
    return res.status(400).json({ error: "No such song" });
  }

  res.status(200).json(song);
});

module.exports = router;

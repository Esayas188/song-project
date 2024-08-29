const mongoose = require('mongoose');
const Schema = mongoose.Schema

const songSchema = new Schema({
    title: {
        type: String,
        required: true
      },
    artist: {
        type: String,
        required: true
      },
    album:{
        type: String,
        required: true
      },
    genre: {
        type: String,
        required: true
      },
  }, { timestamps: true });


  songSchema.pre('save', function (next) {
    this.title = this.title.toLowerCase();
    this.artist = this.artist.toLowerCase();
    this.album = this.album.toLowerCase();
    this.genre = this.genre.toLowerCase();
    next();
  });
  
  const Song = mongoose.model('Song', songSchema);
  
  module.exports = Song;


  
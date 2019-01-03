const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  uuid: { type: String, unique: true },
  title: String,
  description: String,
  url: String,
  image: String,
  price: String,
  date: Date,
  rawDate: String,
  category: Number,
  place: String,
  updated: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now }
});

const EventModel = mongoose.model('event', EventSchema);

module.exports = EventModel;

import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  uuid: String,
  title: String,
  description: String,
  url: String,
  image: String,
  price: String,
  date: String,
});

const EventModel = mongoose.model('event', EventSchema);

export default EventModel;

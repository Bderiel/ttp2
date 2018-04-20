const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  date: { type: Date, required: true },
  event: { type: String, required: true },
  time: { type: String, required: true },
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;

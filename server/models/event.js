const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  date: { type: Date, required: true },
  event: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;

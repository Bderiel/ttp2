const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = new Schema({
  date: { type: Date },
  event: { type: String },
});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;

'use strict';

const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ShiftsSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  address: { type: String, required: true },
  userId: { type: String, required: true },
});

// Compile model from schema
module.exports = mongoose.model('Shifts', ShiftsSchema);

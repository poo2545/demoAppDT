const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
    time: String,
    dosage: String,
    medicationName: String,
    size: String,
  });
const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication;

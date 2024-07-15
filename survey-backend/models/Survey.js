const mongoose = require('mongoose');

const SurveySchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{
    text: String,
    options: [{
      text: String,
      count: { type: Number, default: 0 }
    }]
  }]
});

module.exports = mongoose.model('Survey', SurveySchema);
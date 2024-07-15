const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');

// Get all surveys
router.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new survey
router.post('/', async (req, res) => {
  const survey = new Survey({
    title: req.body.title,
    questions: req.body.questions
  });

  try {
    const newSurvey = await survey.save();
    res.status(201).json(newSurvey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a specific survey
router.get('/:id', getSurvey, (req, res) => {
  res.json(res.survey);
});

// Update a survey
router.patch('/:id', getSurvey, async (req, res) => {
  if (req.body.title != null) {
    res.survey.title = req.body.title;
  }
  if (req.body.questions != null) {
    res.survey.questions = req.body.questions;
  }
  try {
    const updatedSurvey = await res.survey.save();
    res.json(updatedSurvey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a survey
router.delete('/:id', getSurvey, async (req, res) => {
  try {
    await res.survey.remove();
    res.json({ message: 'Survey deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Submit a response
router.post('/:id/respond', getSurvey, async (req, res) => {
  const answers = req.body.answers;
  answers.forEach(answer => {
    const question = res.survey.questions.id(answer.questionId);
    const option = question.options.id(answer.optionId);
    option.count += 1;
  });

  try {
    const updatedSurvey = await res.survey.save();
    res.json(updatedSurvey);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

async function getSurvey(req, res, next) {
  let survey;
  try {
    survey = await Survey.findById(req.params.id);
    if (survey == null) {
      return res.status(404).json({ message: 'Cannot find survey' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.survey = survey;
  next();
}

module.exports = router;
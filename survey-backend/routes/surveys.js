const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey');

// すべてのアンケートを取得
router.get('/', async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 新しいアンケートを作成
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

// 特定のアンケートを取得
router.get('/:id', getSurvey, (req, res) => {
  res.json(res.survey);
});

// アンケートを更新
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

// アンケートを削除
router.delete('/:id', getSurvey, async (req, res) => {
  try {
    await res.survey.remove();
    res.json({ message: 'アンケートが削除されました' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ミドルウェア関数
async function getSurvey(req, res, next) {
  let survey;
  try {
    survey = await Survey.findById(req.params.id);
    if (survey == null) {
      return res.status(404).json({ message: 'アンケートが見つかりません' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.survey = survey;
  next();
}

module.exports = router;
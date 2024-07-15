import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SurveyCreate() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: [{ text: '' }] }]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://survey-system-jhjx.onrender.com/api/surveys', { title, questions });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  // ... rest of the component remains the same
}

export default SurveyCreate;
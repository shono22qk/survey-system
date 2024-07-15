import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SurveyCreate() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ text: '', options: [{ text: '' }] }]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://survey-system-jhjx.onrender.com/api/surveys', { title, questions });
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  // ... rest of the component remains the same
}

export default SurveyCreate;

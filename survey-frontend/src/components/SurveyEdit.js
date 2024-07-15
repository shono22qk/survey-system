import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SurveyEdit() {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurvey = async () => {
      const res = await axios.get(`https://survey-system-jhjx.onrender.com/api/surveys/${id}`);
      setTitle(res.data.title);
      setQuestions(res.data.questions);
    };
    fetchSurvey();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://survey-system-jhjx.onrender.com/api/surveys/${id}`, { title, questions });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  // ... rest of the component remains the same
}

export default SurveyEdit;
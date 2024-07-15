import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function SurveyResponse() {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchSurvey = async () => {
      const res = await axios.get(`https://survey-system-jhjx.onrender.com/api/surveys/${id}`);
      setSurvey(res.data);
    };
    fetchSurvey();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://survey-system-jhjx.onrender.com/api/surveys/${id}/respond`, { answers });
      history.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <div>
     
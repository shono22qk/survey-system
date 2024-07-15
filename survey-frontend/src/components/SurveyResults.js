import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SurveyResults() {
  const [survey, setSurvey] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSurvey = async () => {
      const res = await axios.get(`https://survey-system-jhjx.onrender.com/api/surveys/${id}`);
      setSurvey(res.data);
    };
    fetchSurvey();
  }, [id]);

  if (!survey) return <div>Loading...</div>;

  return (
    <div>
      <h1>{survey.title}</h1>
      {survey.questions.map((question, index) => (
        <div key={index}>
          <h3>質問 {index + 1}: {question.text}</h3>
          <ul>
            {question.options.map((option, optionIndex) => (
              <li key={optionIndex}>
                {option.text}: {option.count} 票
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SurveyResults;
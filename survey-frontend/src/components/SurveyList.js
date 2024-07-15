import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      const res = await axios.get('https://survey-system-jhjx.onrender.com/api/surveys');
      setSurveys(res.data);
    };
    fetchSurveys();
  }, []);

  return (
    <div>
      <h1>Survey List</h1>
      <Link to="/create">Create New Survey</Link>
      <ul>
        {surveys.map(survey => (
          <li key={survey._id}>
            {survey.title}
            <Link to={`/edit/${survey._id}`}>Edit</Link>
            <Link to={`/respond/${survey._id}`}>Respond</Link>
            <Link to={`/results/${survey._id}`}>Results</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SurveyList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SurveyResponse() {
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

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
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <div>
      {/* コンポーネントの残りの部分 */}
    </div>
  );
}

export default SurveyResponse;
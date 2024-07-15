import { useState, useEffect } from 'react';
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

  const handleAnswer = (questionId, optionId) => {
    setAnswers({
      ...answers,
      [questionId]: optionId
    });
  };

  if (!survey) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>{survey.title}</h2>
      {survey.questions.map((question) => (
        <div key={question._id}>
          <h3>{question.text}</h3>
          {question.options.map((option) => (
            <label key={option._id}>
              <input
                type="radio"
                name={question._id}
                value={option._id}
                onChange={() => handleAnswer(question._id, option._id)}
              />
              {option.text}
            </label>
          ))}
        </div>
      ))}
      <button type="submit">Submit Response</button>
    </form>
  );
}

export default SurveyResponse;
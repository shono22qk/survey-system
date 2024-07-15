import { useState, useEffect } from 'react';
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

  // 質問を追加する関数
  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: [{ text: '' }] }]);
  };

  // オプションを追加する関数
  const addOption = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ text: '' });
    setQuestions(newQuestions);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Survey Title"
      />
      {questions.map((question, qIndex) => (
        <div key={qIndex}>
          <input
            type="text"
            value={question.text}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[qIndex].text = e.target.value;
              setQuestions(newQuestions);
            }}
            placeholder="Question"
          />
          {question.options.map((option, oIndex) => (
            <input
              key={oIndex}
              type="text"
              value={option.text}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[qIndex].options[oIndex].text = e.target.value;
                setQuestions(newQuestions);
              }}
              placeholder="Option"
            />
          ))}
          <button type="button" onClick={() => addOption(qIndex)}>Add Option</button>
        </div>
      ))}
      <button type="button" onClick={addQuestion}>Add Question</button>
      <button type="submit">Update Survey</button>
    </form>
  );
}

export default SurveyEdit;
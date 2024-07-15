import { useState } from 'react';
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
      <button type="submit">Create Survey</button>
    </form>
  );
}

export default SurveyCreate;
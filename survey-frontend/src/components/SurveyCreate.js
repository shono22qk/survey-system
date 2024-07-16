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
      console.log('送信データ:', { title, questions });  // デバッグ用

      const response = await axios.post('https://survey-system-jhjx.onrender.com/api/surveys', { title, questions });
      
      console.log('APIレスポンス:', response);  // デバッグ用

      if (response.status === 201) {
        console.log('アンケートが正常に作成されました');
        navigate('/');
      } else {
        console.error('予期せぬステータスコード:', response.status);
      }
    } catch (err) {
      console.error('アンケート作成中にエラーが発生しました:', err);
      if (err.response) {
        console.error('エラーレスポンス:', err.response.data);
        console.error('エラーステータス:', err.response.status);
      } else if (err.request) {
        console.error('リクエストエラー:', err.request);
      } else {
        console.error('エラーメッセージ:', err.message);
      }
    }
  };

  // タイトルの入力ハンドラを追加
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 質問の追加ハンドラ
  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: [{ text: '' }] }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="アンケートのタイトル"
      />
      {/* 質問のレンダリング */}
      {questions.map((question, index) => (
        <div key={index}>
          {/* 質問の入力フィールド */}
        </div>
      ))}
      <button type="button" onClick={addQuestion}>質問を追加</button>
      <button type="submit">アンケートを作成</button>
    </form>
  );
}

export default SurveyCreate;
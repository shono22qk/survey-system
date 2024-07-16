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

  // ... (残りのコンポーネントコードは変更なし)

  return (
    <form onSubmit={handleSubmit}>
      {/* ... (フォームの内容は変更なし) */}
      <button type="submit">アンケートを作成</button>
    </form>
  );
}

export default SurveyCreate;
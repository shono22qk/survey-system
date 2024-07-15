import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyList from './components/SurveyList';
import SurveyCreate from './components/SurveyCreate';
import SurveyEdit from './components/SurveyEdit';
import SurveyResponse from './components/SurveyResponse';
import SurveyResults from './components/SurveyResults';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SurveyList />} />
          <Route path="/create" element={<SurveyCreate />} />
          <Route path="/edit/:id" element={<SurveyEdit />} />
          <Route path="/respond/:id" element={<SurveyResponse />} />
          <Route path="/results/:id" element={<SurveyResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
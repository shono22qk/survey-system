import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SurveyList from './components/SurveyList';
import SurveyCreate from './components/SurveyCreate';
import SurveyEdit from './components/SurveyEdit';
import SurveyResponse from './components/SurveyResponse';
import SurveyResults from './components/SurveyResults';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SurveyList} />
          <Route path="/create" component={SurveyCreate} />
          <Route path="/edit/:id" component={SurveyEdit} />
          <Route path="/respond/:id" component={SurveyResponse} />
          <Route path="/results/:id" component={SurveyResults} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
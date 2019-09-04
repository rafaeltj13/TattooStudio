import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../css/App.css';
import SigninCostumer from '../components/signin/SigninCostumer';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/signin" component={SigninCostumer}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

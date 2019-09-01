import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../css/App.css';
import Signin from '../components/signin/SigninPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signin" component={Signin}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

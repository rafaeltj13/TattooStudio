import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../css/App.css';
import Signin from '../components/signin/Signin';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/signin" component={Signin}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

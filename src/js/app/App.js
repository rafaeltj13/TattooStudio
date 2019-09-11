import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import '../../css/App.css';
import SigninRoutes from '../components/signin/SigninRoutes';
import Notification from '../components/custom/notification';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={SigninRoutes} />
          <Redirect to={{ pathname: '/signin' }} />
        </Switch>
      </Router>
      <Notification />
    </div>
  );
}

export default App;

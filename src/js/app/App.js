import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../../css/App.css';
import Home from '../components/home';
import Signin from '../components/signin/Signin';
import SignupRoutes from '../components/signup/SignupRoutes';
import Notification from '../components/custom/notification';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={SignupRoutes}/>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <Notification />
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewClothe from './clothes/pages/NewClothe';

const App = () => {
  return (
  <Router>
    <Switch>
      <Route path="/" exact>
        <Users/>
      </Route>
      <Route path="/clothes/new" exact>
        <NewClothe/>
      </Route>
      <Redirect to="/"/>
    </Switch>
  </Router>
  );
};

export default App;

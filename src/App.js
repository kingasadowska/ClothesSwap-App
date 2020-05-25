import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewClothe from './clothes/pages/NewClothe';
import NavBar from './shared/components/Navigation/NavBar';
import UserClothes from './clothes/pages/UserClothes';
import UpdateClothes from './clothes/pages/UpdateClothes';
import Auth from './user/pages/Auth';

const App = () => {
  return (
  <Router>
    <NavBar />
    <main>
      <Switch>
        <Route path="/" exact>
          <Users/>
        </Route>
        <Route path="/:userId/clothes" exact>
        <UserClothes />
        </Route>
        <Route path="/clothes/new" exact>
          <NewClothe/>
        </Route>
        <Route path="/clothes/:clothesId">
            <UpdateClothes />
        </Route>
        <Route path="/auth">
            <Auth />
        </Route>
        <Redirect to="/"/>
      </Switch>
    </main>
  </Router>
  );
};

export default App;

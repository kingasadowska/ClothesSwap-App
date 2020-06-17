import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewClothe from './clothes/pages/NewClothe';
import NavBar from './shared/components/Navigation/NavBar';
import UserClothes from './clothes/pages/UserClothes';
import UpdateClothes from './clothes/pages/UpdateClothes';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsAuthenticated(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserId(null);
  }, []);

  let routes;

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/clothes" exact>
          <UserClothes />
        </Route>
        <Route path="/clothes/new" exact>
          <NewClothe />
        </Route>
        <Route path="/clothes/:clothesId">
          <UpdateClothes />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/clothes" exact>
          <UserClothes />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ 
        isAuthenticated: isAuthenticated, 
        userId: userId, 
        login: login, 
        logout: logout, 
      }}
    >
      <Router>
        <NavBar />
        <main>
         {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

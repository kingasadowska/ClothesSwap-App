import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewClothe from './clothes/pages/NewClothe';
import NavBar from './shared/components/Navigation/NavBar';
import UserClothes from './clothes/pages/UserClothes';
import UpdateClothes from './clothes/pages/UpdateClothes';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      'userData',
      JSON.stringify({ userId: uid, token: token})
    );
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);


  let routes;

  if (token) {
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
        isAuthenticated: !!token, 
        token: token,
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

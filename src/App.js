import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Users from './user/pages/Users';
import NewClothe from './clothes/pages/NewClothe';
import NavBar from './shared/components/Navigation/NavBar';
import UserClothes from './clothes/pages/UserClothes';
import UpdateClothes from './clothes/pages/UpdateClothes';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = 
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
      'userData',
      JSON.stringify({ 
        userId: uid, 
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
        storedData && 
        storedData.token && 
        new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
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

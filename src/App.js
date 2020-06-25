import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import NavBar from './shared/components/Navigation/NavBar';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Spinner from './shared/components/UIElements/Spinner';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewClothe = React.lazy(() => import('./clothes/pages/NewClothe'));
const UserClothes = React.lazy(() => import('./clothes/pages/UpdateClothes'));
const UpdateClothes = React.lazy(() => import('./clothes/pages/UpdateClothes'));
const Auth = React.lazy(() => import('./user/pages/Auth'));

const App = () => {
const { token, login, logout, userId } = useAuth();

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
          <Suspense fallback={
            <div className="center">
              <Spinner/>
            </div>
          }>
         {routes}
         </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;

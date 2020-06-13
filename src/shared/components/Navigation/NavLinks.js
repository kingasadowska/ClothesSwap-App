import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import Button from '../Buttons/Button';
import './NavLinks.css';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>ALL USERS</NavLink>
      </li>
      {auth.isAuthenticated && (
        <li>
          <NavLink to={`/${auth.userId}/clothes`}>MY CLOTHES</NavLink>
        </li>
      )}
      {auth.isAuthenticated && (
        <li>
          <NavLink to="/clothes/new">ADD CLOTHES</NavLink>
        </li>
      )}
      {!auth.isAuthenticated && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isAuthenticated && (
        <li>
          <Button primary onClick={auth.logout}>LOGOUT</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
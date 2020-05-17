import React from 'react';
import Header from './Header.js';
import { Link } from 'react-router-dom';
import './NavBar.css';
import NavLinks from './NavLinks';

const NavBar = props => {
  return (
    <Header>
      <button className="navigation_menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h1 className="navigation_title">
        <Link to="/">YourPlaces</Link>
      </h1>
      <nav>
        <NavLinks />
      </nav>
    </Header>
  );
};

export default NavBar;

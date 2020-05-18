import React, { useState } from 'react';
import Header from './Header.js';
import { Link } from 'react-router-dom';
import './NavBar.css';
import SideDrawer from './SideDrawer';
import BackDrop from '../UIElements/BackDrop';
import NavLinks from './NavLinks';

const NavBar = props => {
  const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState(false);

  const openSideDrawerHandler = () => {
    setSideDrawerIsOpen(true);
  };

  const closeSideDrawerHandler = () => {
    setSideDrawerIsOpen(false);
  };

  return (
    <>
      {sideDrawerIsOpen && <BackDrop onClick={closeSideDrawerHandler} />}
      <SideDrawer 
      show={sideDrawerIsOpen} 
      onClick={closeSideDrawerHandler}>
        <nav className="navigation_sideDrawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>

      <Header>
        <button className="navigation_menu-btn" onClick={openSideDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="navigation_title">
          <Link to="/">YourClothes</Link>
        </h1>
        <nav className="navigation_header-nav">
          <NavLinks />
        </nav>
      </Header>
    </>
  );
};

export default NavBar;

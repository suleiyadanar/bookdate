import React from 'react'
import './Header.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';

import { Link } from "react-router-dom";
function Header({backButton}) {

  return (
    <div className="header">
      {backButton ? (
        // <IconButton onClick={() => history.replace(backButton)}>
        <ArrowBackIosIcon fontSize="large" className='header__icon' />
      ):
      <AccountCircleIcon fontSize="large" className="header__icon"/>
    }

        <Link to="/">
          <h2>Sign Out</h2>
        </Link>

        <Link to="/shelf">
          <MenuBookIcon fontSize="large" className="header__icon"/>
        </Link>

    </div>
  );
}

export default Header;
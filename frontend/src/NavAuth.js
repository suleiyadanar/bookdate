import React, { useState } from 'react'
import './NavAuth.css'
import AutoStoriesIcon from '@material-ui/icons/AmpStories';

const NavAuth = ({authToken ,setShowModal, showModal, setIsSignUp}) => {
    const handleClick = () => {
        console.log("clicked");
        setShowModal(true);
        setIsSignUp(false);
      };

  return (
      <div>
        <div className="auth__header">
            <div className="auth__logoName">
            <AutoStoriesIcon className="auth__logo" fontSize="large"/>
            <h1 className="auth__text">Book Date</h1>
            </div>

            {!authToken && <h2 className="auth__login" onClick={handleClick}>Login</h2>}
        </div>
        </div>
  )
}

export default NavAuth
import React, { useState } from "react";
import AuthModal from "./AuthModal";
import NavAuth from "./NavAuth";

import "./Auth.css";

const Auth = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSignUp,setIsSignUp]=useState(true);
  const [authToken,setAuthToken] = useState(false);

  const handleClick = () => {

    setShowModal(true);
    setIsSignUp(true);
    console.log(isSignUp)
  };

  return (

    <div className="auth">
      <NavAuth
        authToken={authToken}
        setShowModal={setShowModal}
        showModal = {showModal}
        setIsSignUp={setIsSignUp}
        />
      <div className="auth__main">
        <h1 className="auth__slogan">Your Book Date Awaits</h1>
        <button className="auth__create" onClick={handleClick}>
          {authToken ? "Sign Out" : "Create Account"}
        </button>
        {showModal && (
            <AuthModal setAuthToken={setAuthToken} setShowModal={setShowModal} isSignUp={isSignUp} />
        )}


      </div>
    </div>
  );
};

export default Auth;

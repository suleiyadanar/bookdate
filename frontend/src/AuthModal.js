import React, { useState } from 'react'
import './AuthModal.css'
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const AuthModal = ({setAuthToken, setShowModal,setIsSignUp,isSignUp}) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(null);

    let navigate = useNavigate();

    const handleClick = () => {
        setShowModal(false)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            if(isSignUp && (password !== confirmPassword)){
                setError('Passwords need to match')
                return
            }
            console.log('posting', email, password)
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'signup' : 'login'}` , {email,password})

            setCookie('Email', response.data.email)
            setCookie('UserId', response.data.userId)
            setCookie('AuthToken', response.data.token)

            const success = response.status === 201
            if (success && isSignUp) navigate('/swipe')
            if (success && !isSignUp) navigate('/swipe')
            window.location.reload()
        }catch(error){
            console.log(error)
        }
    }

  return (
    <div className="authModal">
        <div onClick={handleClick}>
            <CloseIcon />
        </div>
        <h3>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h3>
        <p><i>By clicking submit, you agree to our terms. Learn how we process your data in our terms and policy.</i></p>
        <form onSubmit={handleSubmit} className="formSubmit">
            <div className="formInput">


             <input
                className="formInput1" type="email" id="email" name="email" placeholder="email" required={true}
                onChange={(e)=> setEmail(e.target.value)} />
            <input
                className="formInput1" type="password" id="password" name="password" placeholder="password" required={true}
                onChange={(e)=> setPassword(e.target.value)}/>

            {isSignUp && <input
                className="formInput1" type="password" id="confirmPassword" name="confirmPassword" placeholder="confirmPassword" required={true}
                onChange={(e)=> setConfirmPassword(e.target.value)}/>}

            <input className='secondary-btn' type="submit"/>
            </div>
            <p>{error}</p>

            </form>

    </div>
  )
}

export default AuthModal
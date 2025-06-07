import React, { useState } from 'react'
import "./Signup.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Signup = () => {
    const [name, SetName] = useState();
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/signup', {name, email, password})
        .then(result => console.log(result))
        navigate('/login')
        .catch(err => console.log(err))
    }
  return (
    <div className='signup'>
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
            <div className="signup-fields">
                <input type='text' placeholder='Your Name' onChange={(e)=> SetName(e.target.value)}/>
                <input type='email' placeholder='Your Email Id' onChange={(e)=> SetEmail(e.target.value)}/>
                <input type='password' placeholder='Enter Password'onChange={(e)=> SetPassword(e.target.value)}/>
            </div>
            <button type='submit'>Continue</button>
            </form>
            <div className="signup-login">Already have an Account?<span className='loginhere'><Link to='/login'>Login Here</Link></span></div>
            <div className="signup-agree">
                <input type='checkbox' name='' id=''/>
                <p>By continuing, I agree to the <span className='tc'>Terms & Conditions</span></p>
            </div>
        </div>
    </div>
  )
}

export default Signup
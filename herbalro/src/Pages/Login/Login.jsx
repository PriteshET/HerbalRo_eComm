import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

export const Login = () => {
    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/login', { email, password }, { withCredentials: true })
            .then(res => {
            if (res.data.message === "Success") {
                if (response.data.role === "admin") {
                    navigate("/admin");
                } else if (response.data.role === "moderator") {
                    navigate("/admin/orders");
                }
                else {
                    window.location.href = "/"; // Or user dashboard
                }
            } else {
                toast.error(res.data.message);
            }
            })
            .catch(err => {
            console.error(err);
            toast.error("Login failed. Please try again.");
            });
        };

 
    return (
    <div className='login'>
        <ToastContainer/>
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}> 
            <div className="login-fields">
                <input type='email' placeholder='Your Email Id' onChange={(e)=> SetEmail(e.target.value)}/>
                <input type='password' placeholder='Enter Password' onChange={(e)=> SetPassword(e.target.value)}/>
            </div>
            <button type='submit'>Log In</button>
            </form>
            <div className="login-signup">Don't have an Account?<span className='signuphere'><Link to='/signup'>Register Here</Link></span></div>
        </div>
    </div>
  )
}

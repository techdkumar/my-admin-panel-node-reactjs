import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import './login.css'; // Importing the login.css file

import Header from './Header';
import Footer from './Footer';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [loginError, setLoginError] = useState('');
	

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = { email, password };

        if (email.length === 0) {
            setEmailError('Please enter Email Address');
            return;
        }

        if (password.length === 0) {
            setPasswordError('Please enter password');
            return;
        }

        fetch('http://localhost:8881/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setEmail('');
            setPassword('');
            setIsLoggedin(true);
            // Redirect back after a delay
            setTimeout(() => {
            setIsLoggedin(false); // Hide success message
              
            navigate('/admin/dashboard')
            }, 3000); // Change the delay (in milliseconds) as needed
        })
        .catch(error => {
            setLoginError('Invalid email or password');
            console.error('There was a problem with your fetch operation:', error);
        });
    }

    const validateEmail = () => {
        if (email.length === 0) {
            setEmailError('Please enter Email Address');
        } else {
            setEmailError('');
        }
    }

    const validatePassword = () => {
        if (password.length === 0) {
            setPasswordError('Please enter password');
        } else {
            setPasswordError('');
        }
    }

    return (
        <>
            <Header />
            <div className="account-wrapper">
                <div className="log_user">
                    <div className="panelpart">
					 {isLoggedin ? (
                    <div className="alert alert-success" role="alert">
                        Login successful!
                    </div>
					) : null}
                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="col-sm-12 loghead">
                                <p>Welcome To Admin Panel</p>
								 
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        type="email"
                                        className="form-control input-size"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={validateEmail}
                                    />
                                    <div className="input-group-addon"><i className="fa fa-user"></i></div>
                                </div>
                                <div style={{ color: 'red' }} className="error">
                                    {emailError}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <input
                                        type="password"
                                        className="form-control input-size"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={validatePassword}
                                    />
                                    <div className="input-group-addon"><i className="fa fa-lock"></i></div>
                                </div>
                                <div style={{ color: 'red' }} className="error">
                                    {passwordError} {loginError && loginError}
                                </div>
								{/*loginError && <div style={{ color: 'red' }} className="error">{loginError}</div>*/}
                            </div>
                            <div className="col-xs-12">
                                <div className="form-group">
                                    <input type="submit" className="btn btn-primary btn-block account-btn" value="Login" />
                                </div>
                               
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AdminLogin;




   
import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LoggedInUser } from '../../App';
import { facebookSignIn, googleSignIn, handleLogin, initializeLoginFrameworkFirebase } from '../LoginManager/loginManager';
import './Login.css'


initializeLoginFrameworkFirebase();

const Login = () => {
    let location = useLocation();
    let history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useContext(LoggedInUser)
    const [data, setData] = useState({
        email: '',
        password: '',
        error: '',
        success: false,
    });

    console.log(data)

    // for pushing input value in data
    const handleValueChange = (e) => {
        const newData = {...data}
        newData[e.target.name] = e.target.value;
        setData(newData);
    }

      const handleEmailLogin = (e) => {
        e.preventDefault();

        handleLogin(data.email, data.password)
        .then(userData => {
            setUser(userData)
            const newData = {...data}
                newData.isSignedIn = userData.isSignedIn;
                newData.error = userData.error;
                newData.success = userData.success;
            setData(newData);
            if(userData.isSignedIn === true){
                history.replace(from);
            }
        })
      }
    

    const handleGoogleSignIN = () => {
        googleSignIn()
        .then(data => {
            setUser(data);
            if(data.isSignedIn === true){
                history.replace(from);
            }
            setData(data)
        })
    }

    const handleFbSignIn = () => {
        facebookSignIn()
        .then(data => {
            setUser(data);
            if(data.isSignedIn === true){
                history.replace(from);
            }
            setData(data)
        })
    }
    
    
    return (
        <div className="loginArea">
            <form onSubmit={handleEmailLogin} className="loginCreateForm detailFormArea" action="">
                <h2 className="text-dark">Login</h2>
                <input className="loginCreateFormInput" name="email" type="text" onBlur={handleValueChange} id="origin" placeholder="Username or Email" required/>
                <input className="loginCreateFormInput" name="password" type="password" onBlur={handleValueChange} id="Password" placeholder="Password" required/>
                <div className="d-flex align-items-center justify-content-between my-3">
                    <div className="d-flex align-items-center">
                        <input className="checkboxRemember" type="checkbox" name="Remember me" id="remember"/>
                        <label className="rememberMe" htmlFor="remember">Remember Me</label>
                    </div>
                    <div>
                        <Link className="text-warning" to='/login'>Forgot Password</Link>
                    </div>
                </div>
                {
                    data.success ? <p></p> : <p className="text-danger m-0 text-center" style={{fontSize: '14px'}}>{data.error}</p>
                }
                <button type="submit" className="btn btn-warning loginCreateBtn">Login</button>
                <p className="text-dark dontHaveAccount text-center">Don't have an account? <Link to="/create-new-account" className="text-warning">Create an account</Link></p>
            </form>
            <div className="orSection">
                <hr style={{width: '45%', float: 'left'}}/><span>Or</span><hr style={{width: '45%', float: 'right'}}/>
            </div>
            <div onClick={handleGoogleSignIN} className="googleFbSignIn">
                <img className="googleFbImage" src="https://i.ibb.co/68y93F9/google.png" alt=""/>
                <p className="m-0 text-center">Continue with Google</p>
            </div>
            <div onClick={handleFbSignIn} className="googleFbSignIn">
                <img className="googleFbImage" src="https://i.ibb.co/ZhnqwJs/fb.png" alt=""/>
                <p className="m-0 text-center">Continue with Facebook</p>
            </div>
        </div>
    );
};

export default Login;
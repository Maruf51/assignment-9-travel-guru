import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { LoggedInUser } from '../../App';
import { createNewAccount, createUserInfo, facebookSignIn, googleSignIn, initializeLoginFrameworkFirebase } from '../LoginManager/loginManager';
import './CreateAccount.css'

const CreateAccount = () => {
    let location = useLocation();
    let history = useHistory();
    let { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useContext(LoggedInUser);

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        success: false,
        error: ''
    });
    console.log(userData);

    const handleValueChange = (e) => {
            const newData = {...userData}
            newData[e.target.name] = e.target.value;
            setUserData(newData);
    }

    const handleCreateAccount = (e) => {
        e.preventDefault();

        if(userData.password === userData.confirmPassword){
            createNewAccount(userData.email, userData.password)
            .then(data => {
                setUser(data)
                userInfo(userData)
                setUserData(data)
            })
        }
        else{
            alert("Password and Confirm Password didn't match.")
        }
    }

    const userInfo = () => {
        createUserInfo(userData.firstName, userData.lastName, userData.password)
    }

    const handleGoogleSignIN = () => {
        googleSignIn()
        .then(data => {
            setUser(data);
            if(data.isSignedIn === true){
                history.replace(from);
            }
        })
    }

    const handleFbSignIn = () => {
        facebookSignIn()
        .then(data => {
            setUser(data);
            if(data.isSignedIn === true){
                history.replace(from);
            }
        })
    }


    return (
        <div onSubmit={handleCreateAccount} className="createAccount">
            <form className="loginCreateForm detailFormArea" action="">
                <h2 className="text-dark">Create an account</h2>
                <input className="loginCreateFormInput" type="text" name="firstName" onBlur={handleValueChange} placeholder="First Name" required/>
                <input className="loginCreateFormInput" type="text" name="lastName" onBlur={handleValueChange} placeholder="Last Name" required/>
                <input className="loginCreateFormInput" type="text" name="email" onBlur={handleValueChange} placeholder="Username or Email" required/>
                <input className="loginCreateFormInput" type="password" name="password" onBlur={handleValueChange} placeholder="Password" required/>
                <input className="loginCreateFormInput" type="password" name="confirmPassword" onBlur={handleValueChange} placeholder="Confirm Password" required/>
                {
                    userData.success ? <p className="text-success text-center m-0">Account created successfully. Please login</p> : <p className="text-danger text-center m-0">{userData.error}</p>
                }
                <button type="submit" className="btn btn-warning loginCreateBtn">Create an account</button>
                <p className="text-dark dontHaveAccount text-center">Already have an account?<Link to="/login" className="text-warning">Login</Link></p>
                </form>

                <div className="orSection">
                    <hr style={{width: '45%', float: 'left'}}/><span>Or</span><hr style={{width: '45%', float: 'right'}}/>
                </div>
                <div onClick={handleGoogleSignIN} className="googleFbSignIn">
                    <img className="googleFbImage" src="https://i.ibb.co/RCSRfVG/google.png" alt=""/>
                    <p className="m-0 text-center">Continue with Google</p>
                </div>
                <div onClick={handleFbSignIn} className="googleFbSignIn">
                    <img className="googleFbImage" src="https://i.ibb.co/f0R5VgT/fb.png" alt=""/>
                    <p className="m-0 text-center">Continue with Facebook</p>
                </div>
                
                
        </div>
    );
};

export default CreateAccount;
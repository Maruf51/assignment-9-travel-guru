import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoggedInUser } from '../../App';
import { userLoggedOut } from '../LoginManager/loginManager';
import './Navbar.css'

const Navbar = () => {
    const [user, setUser] = useContext(LoggedInUser);

    const handleSignOut = () => {
        userLoggedOut()
        .then(data => {
            setUser(data);
        })
    }

    return (
        <div className="container p-3 d-flex justify-content-between align-items-center topNavbar">
            <Link to="/"><img className="logo" src="https://i.ibb.co/B6bT0FV/Logo-1.png" alt=""/></Link>
            <div className="navbar-right-side d-flex justify-content-center">
                <div className="search-box">
                    <input className="search-bar" type="text" placeholder="Search your Destination..."/>
                    <img className="search-icon" src="https://i.ibb.co/Lr4sRmD/search.png" alt=""/>
                </div>
                <div className="d-flex align-items-center">
                    <div className="btn text-white p-0 mx-4 navbar-button">News</div>
                    <div className="btn text-white p-0 mx-4 navbar-button">Destination</div>
                    <div className="btn text-white p-0 mx-4 navbar-button">Blog</div>
                    <div className="btn text-white p-0 mx-4 navbar-button">Contact</div>
                    {
                        user.isSignedIn ? <h3 onClick={handleSignOut} title="Click to Sign out" className="text-warning user-name">{user.name}</h3> : <Link to="/login"><button className="btn btn-warning">Login</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;
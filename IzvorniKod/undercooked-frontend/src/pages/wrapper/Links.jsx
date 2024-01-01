import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/links2.css'
import secureLocalStorage from 'react-secure-storage';



export function Links({ setMessage, changeIsLoggedIn, isAdmin }) {
    return (
        <>
            <nav className='navbar2'>
                {isAdmin ? <div className='left_navbar2'>
                    <div><NavLink className="izbornik_navbar2_admin" to={"/admin"}>Admin Page</NavLink></div>
                </div> : null}

                <div className='right_navbar2'>
                    <img src={require('../images/chef.png')} alt="profile_icon" />
                    <NavLink className="izbornik_navbar2_right" to={"/profile/" + secureLocalStorage.getItem("username")}>My Profile</NavLink>
                    <div><NavLink className="izbornik_navbar2" to={"/login"} onClick={() => {
                        secureLocalStorage.removeItem("logInToken");
                        changeIsLoggedIn(false);
                        setMessage("Logged out!");
                    }}>Logout</NavLink></div>
                </div>
            </nav>

        </>
    );
}
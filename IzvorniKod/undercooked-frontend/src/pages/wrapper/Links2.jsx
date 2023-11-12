import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import '../../styles/links2.css'


export function Links2() {
    return (
            <>  
            <nav className='navbar2'>
                <div className='left_navbar2'>
                <div><NavLink className="izbornik_navbar2" to={"/logout"}>Logout</NavLink></div>
                <div><NavLink className="izbornik_navbar2_admin" to={"/admin"}>Admin Page</NavLink></div>
                </div>
                <div className='right_navbar2'>
                    <img src={require('../images/chef.png')} alt="profile_icon" />
                    <NavLink className="izbornik_navbar2_right" to={"/profile"}>My Profile</NavLink></div>
            </nav>         
                
            </>
        );
}
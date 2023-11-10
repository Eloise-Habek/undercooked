import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import '../../styles/links2.css'


export function Links2() {
    return (
            <>  
            <nav className='navbar2'>
                <div><NavLink className="izbornik_navbar2" to={"/logout"}>logout</NavLink></div>
                <div><NavLink className="izbornik_navbar2" to={"/profile"}>My Profile</NavLink></div>
                <div><NavLink className="izbornik_navbar2_admin" to={"/admin"}>Admin Page</NavLink></div>
            </nav>          
                
            </>
        );
}
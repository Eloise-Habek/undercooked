import React, { useState } from 'react';
import { NavLink} from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';


export function Links2() {
    return (
            <>  
            <nav className='navbar2'>
                <div><NavLink className="izbornik" to={"/profile"}>My Profile</NavLink></div>
                <div><NavLink className="izbornik" to={"/admin"}>Admin Page</NavLink></div>
                <div><NavLink className="izbornik" to={"/logout"}>logout</NavLink></div>
            </nav>          
                
            </>
        );
}
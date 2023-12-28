// import React, { useState, useEffect } from 'react';
// import ProfileService from '../services/ProfileService';
// import secureLocalStorage from 'react-secure-storage';
// import { useNavigate } from 'react-router-dom';
// import "../styles/profile.css"

import { useState } from "react";
import { RecipeMini } from "../components/RecipeMini";
import { SendMessageBox } from "../components/SendMessageBox";
import classes from "../styles/profile/profile.module.css"
import { Footer } from "./wrapper/Footer";
import { NavLink } from "react-router-dom";
import { PageNav } from "../components/PageNav";

export function Profile() {
    // const [email, setEmail] = useState("");
    // const [username, setUsername] = useState("");
    // const [name, setName] = useState("");
    // const [surname, setSurname] = useState("");
    // const navigate = useNavigate()

    // useEffect(() => {
    //     if(secureLocalStorage.getItem("logInToken") != null) {
    //         ProfileService.getProfile().then(res => res.json()).then(data => {
    //             setEmail(data.email);
    //             setUsername(data.username);
    //             setName(data.name);
    //             setSurname(data.surname);
    //         });

    //      } else {
    //         navigate("/login");
    //     }

    // }, [navigate]);
    // return (
    //     <div className='main_profile'>
    //     <div className='slika_profila'>
    //         <img src = {require("./images/default_profile_photo.png")} alt="" />
    //     </div>

    //     <div className='profile-card'>
    //         <div className='info'>
    //             <h2 className='one_info'>Username: {username}</h2>
    //             <h2 className='one_info'>Name: {name}</h2>
    //             <h2 className='one_info'>Surname: {surname}</h2>
    //             <p className='one_info'>Email: {email}</p>
    //         </div>
    //     </div>
    // </div>
    //     );
    const [showMessageBox, setShowMessageBox] = useState(0)
    return <>
        <div className={classes.wrapper}>
            <div>
                <div className={classes.profile_intro}>
                    <img src={require("./images/chef.png")} alt="" />
                    <h3>Username</h3>
                    <NavLink className="fa fa-cog" to={"/editProfile"}></NavLink>
                </div>
                <div >
                    <button>Follow</button>
                    <button onClick={() => { showMessageBox ? setShowMessageBox(0) : setShowMessageBox(1) }
                    }>
                        {showMessageBox ? "Close message box" : "Message"}
                    </button>
                </div>
            </div>
            {showMessageBox ? <SendMessageBox /> : null}

            <div className={classes.profile_stats}>
                <div>100 Folowing</div>
                <div>100 Followers</div>
                <div>100 Recipes saved</div>
            </div>
            <div>Posted recipes:</div>
            <div>
                <RecipeMini />
                <RecipeMini />
                <RecipeMini />
            </div>

        </div>
        <PageNav />
        <Footer sticky={1} />
    </>

}


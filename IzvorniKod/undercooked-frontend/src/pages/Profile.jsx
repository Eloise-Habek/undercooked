// import React, { useState, useEffect } from 'react';
// import ProfileService from '../services/ProfileService';
// import secureLocalStorage from 'react-secure-storage';
// import { useNavigate } from 'react-router-dom';
// import "../styles/profile.css"

import { useState } from "react";
import { RecipeMini } from "../components/RecipeMini";
import { SendMessageBox } from "../components/SendMessageBox";
import classes from "../styles/profile/profile.module.css";
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
  const [showMessageBox, setShowMessageBox] = useState(0);
  return (
    <>
      <div className={classes.profileWrapper}>
        <div className={classes.profileSection}>
          <div className={classes.profileIntro}>
            <img
              src={require("./images/chef.png")}
              alt=""
              className={classes.profileImage}
            />
            <NavLink
              to={"/editProfile"}
              className={`${classes.settingsLink} fa fa-cog`}
            ></NavLink>
            <h3 className={classes.username}>Username</h3>
          </div>
          <div className={classes.profileActions}>
            <button className={classes.followButton}>Follow</button>
            <button
              onClick={() => {
                showMessageBox ? setShowMessageBox(0) : setShowMessageBox(1);
              }}
              className={classes.messageButton}
            >
              {showMessageBox ? "Close message box" : "Message"}
            </button>
          </div>

          <div className={classes.profileStats}>
            <div className={classes.statItem}>
              <span className={classes.statValue}>100</span>
              <span className={classes.statLabel}>Following</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statValue}>100</span>
              <span className={classes.statLabel}>Followers</span>
            </div>
            <div className={classes.statItem}>
              <span className={classes.statValue}>100</span>
              <span className={classes.statLabel}>Recipes saved</span>
            </div>
          </div>
        </div>

        {showMessageBox ? <SendMessageBox /> : null}

        <div className={classes.recipeSection}>
          <div className={classes.postedRecipes}>Posted recipes:</div>
          <div className={classes.recipeContainer}>
            <RecipeMini />
            <RecipeMini />
            <RecipeMini />
            <RecipeMini />
            <RecipeMini />
            <RecipeMini />
            <RecipeMini />
            <RecipeMini />
            <RecipeMini />
            <RecipeMini />
            <RecipeMini />
            <RecipeMini />
          </div>
        </div>
      </div>
      <PageNav />
    </>
  );
}

import React, { useState, useEffect } from 'react';
import ProfileService from '../services/ProfileService';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/profile.css"


import { RecipeMini } from "../components/RecipeMini";
import { SendMessageBox } from "../components/SendMessageBox";
import classes from "../styles/profile/profile.module.css"
import { Footer } from "./wrapper/Footer";
import { NavLink } from "react-router-dom";
import { PageNav } from "../components/PageNav";
import FollowService from '../services/FollowService';
import RecipeService from '../services/RecipeService';

export function Profile() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();
    const [followers, setFollowers] = useState("");
    const [following, setFollowing] = useState("");
    const [isFollowing, setIsFollowing] = useState("");
    const [savedCount, setSavedCount] = useState(0);

    let { user } = useParams();
    let [recipeArray, setRecipeArray] = useState([]);

    const arrayDataItems = recipeArray.map((r) =>
        <RecipeMini details={r} isReceiver={true} />);

    useEffect(() => {
        if (secureLocalStorage.getItem("logInToken") != null) {
            ProfileService.getProfile(user).then(res => res.json()).then(data => {
                //setEmail(data.email);
                setUsername(data.username);
                setName(data.name);
                setSurname(data.surname);
                setRecipeArray(data.recipes);
                setFollowers(data.followers);
                setFollowing(data.following);
                setIsFollowing(data.isFollowed);
                let recipeService = new RecipeService();
                recipeService.getSavedCount(data.username)
                    .then(res => res.json()).then(res => setSavedCount(res));
            });


        } else {
            navigate("/login");
        }

    }, [navigate, user]);
    const [showMessageBox, setShowMessageBox] = useState(0)
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
                        {user === secureLocalStorage.getItem("username") ?
                            <NavLink
                                to={"/settings"}
                                className={`${classes.settingsLink} fa fa-cog`}
                            ></NavLink>
                            : null}

                        <h3 className={classes.username}>@{username}</h3>
                    </div>


                    {username === secureLocalStorage.getItem("username") ? null :
                        <div className={classes.profileActions}>

                            <button className={classes.followButton} type='button' onClick={() => {
                                setIsFollowing(!isFollowing);
                                let followService = new FollowService();
                                if (isFollowing) {
                                    followService.unfollow(username).then(res => {
                                        if (!res.ok) {
                                            alert("Something went wrong!");
                                        }
                                    })
                                } else {
                                    followService.follow(username).then(res => {
                                        if (!res.ok) {
                                            alert("Something went wrong!");
                                        }
                                    })
                                }
                            }}>{isFollowing ? "Following" : "Follow"}</button>
                            <button onClick={() => { showMessageBox ? setShowMessageBox(0) : setShowMessageBox(1) }
                            }>
                                {showMessageBox ? "Close message box" : "Message"}
                            </button>
                        </div>
                    }


                    <div className={classes.profileStats}>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}><NavLink to={"/following/" + username}>{following}</NavLink></span>
                            <span className={classes.statLabel}>Following</span>
                        </div>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}><NavLink to={"/followers/" + username}>{followers}</NavLink></span>
                            <span className={classes.statLabel}>Followers</span>
                        </div>
                        <div className={classes.statItem}>
                            <span className={classes.statValue}>
                                <NavLink to={"/recipe/saved/" + username}>{savedCount}</NavLink>
                            </span>
                            <span className={classes.statLabel}>Recipes saved</span>
                        </div>
                    </div>
                </div>

                {showMessageBox ? <SendMessageBox username={user} /> : null}

                <div className={classes.recipeSection}>
                    {arrayDataItems.length > 0 ? <>
                        <div className={classes.postedRecipes}>Posted recipes:</div>
                        <div className={classes.recipeContainer}>
                            {arrayDataItems.reverse()}
                        </div>

                    </> :
                        <div className={classes.postedRecipes}>User didn't post anything</div>}
                </div>
            </div>
            {/* <PageNav /> */}
        </>
    );

}

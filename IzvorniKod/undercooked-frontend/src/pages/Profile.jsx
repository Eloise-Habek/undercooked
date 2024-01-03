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

export function Profile() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate();
    const [followers, setFollowers] = useState("");
    const [following, setFollowing] = useState("");
    const [isFollowing, setIsFollowing] = useState("");

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
            });

        } else {
            navigate("/login");
        }

    }, [navigate, user]);
    const [showMessageBox, setShowMessageBox] = useState(0)
    return <>
        <div className={classes.wrapper}>
            <div>
                <div className={classes.profile_intro}>
                    <img src={require("./images/chef.png")} alt="" />
                    <h3>@{username}</h3>
                    <NavLink className="fa fa-cog" to={"/editProfile"}></NavLink>
                </div>
                {username === secureLocalStorage.getItem("username") ? null :
                    <div >

                        <button type='button' onClick={() => {
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

            </div>
            {showMessageBox ? <SendMessageBox username={user} /> : null}

            <div className={classes.profile_stats}>
                <div><NavLink to={"/following/" + username}>{following + " Following"}</NavLink></div>
                <div><NavLink to={"/followers/" + username}>{followers + " Followers"}</NavLink></div>
                <div>100 Recipes saved</div>
            </div>
            {arrayDataItems.length > 0 ? <>
                <div>Posted recipes:</div>
                <div>
                    {arrayDataItems.reverse()}
                </div>

            </> : null}


        </div>
        <PageNav />
        <Footer sticky={1} />
    </>

}

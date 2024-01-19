import { NavLink } from "react-router-dom"
import classes from "../styles/profile/profile-mini.module.css"
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export function ProfileMini({ username, followService }) {
    const [following, setFollowing] = useState(false);
    useEffect(() => {
        followService.isFollowing(username).then((res) => { setFollowing(res) }, () => { })
    }, [followService, username])
    return (
        <>
            <div className={classes.wrapper}>
                <div
                    className={classes.button_recipe}
                >
                    <div className={classes.image_and_title}>
                        <div className={classes.profile_img}>
                            <img src={require("../pages/images/chef.png")} alt="" />
                        </div>
                        <div>
                            <NavLink to={"/profile/" + username}><h3>{username}</h3></NavLink>

                        </div>
                        {secureLocalStorage.getItem("username") !== username ?
                            <button type="button" onClick={() => {
                                setFollowing(!following);
                                if (!following) {
                                    followService.follow(username).then(() => { }, () => { });
                                } else {
                                    followService.unfollow(username).then(() => { }, () => { });
                                }
                            }}>{following ? "Following" : "Follow"}</button>
                            : null
                        }

                    </div>
                </div>
            </div>
        </>
    );
}
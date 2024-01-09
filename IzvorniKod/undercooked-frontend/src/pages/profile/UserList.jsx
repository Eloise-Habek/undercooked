import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import FollowService from "../services/FollowService";

export function UserList({ followers, following }) {
    let { user } = useParams();
    const [userArray, setUserArray] = useState([]);
    const arrayDataItems = userArray.map((e) =>
        <li><NavLink to={"/profile/" + e.username}>{e.username}</NavLink></li>);
    useEffect(() => {
        if (followers) {
            let followService = new FollowService();
            followService.getFollowers(user).then(res => setUserArray(res), () => { });
        } else if (following) {
            let followService = new FollowService();
            followService.getFollowing(user).then(res => setUserArray(res), () => { });
        }
    })
    return <>
        <div>{followers ? "Followers:" : "Following:"}</div>
        <ul>
            {arrayDataItems}
        </ul>
    </>
}
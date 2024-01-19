import { useEffect, useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import FollowService from "../../services/FollowService";
import { ProfileMini } from "../../components/ProfileMini";
import classes from "../../styles/profile/userlist.module.css"
import { Footer } from "../wrapper/Footer";

export function UserList({ followers, following }) {
    let { user } = useParams();
    const [userArray, setUserArray] = useState([]);
    const followService = useMemo(() => new FollowService(), []);
    const arrayDataItems = userArray.map((e) =>
        <li><ProfileMini username={e.username} followService={followService} /></li>);
    useEffect(() => {
        if (followers) {
            followService.getFollowers(user).then(res => setUserArray(res), () => { });
        } else if (following) {
            followService.getFollowing(user).then(res => setUserArray(res), () => { });
        }
    }, [followService, followers, following, user])
    return <div className={classes.wrapper}>
        <div className={classes.title}><h3>{followers ? "Followers:" : "Following:"}</h3></div>
        <ul className={classes.no_bullets}>
            {arrayDataItems}
        </ul>
        <Footer sticky={0} />
    </div>
}
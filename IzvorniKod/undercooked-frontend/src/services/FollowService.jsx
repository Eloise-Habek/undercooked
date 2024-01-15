import secureLocalStorage from "react-secure-storage";
import { myFetch } from "../functions/myFetch";

const URL = "/api/follow";

class FollowService {
    follow(user) {
        return myFetch(URL + "/" + user, {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }
    unfollow(user) {
        return myFetch(URL + "/unfollow/" + user, {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }
    getFollowers(user) {
        return myFetch(URL + "/followers/" + user, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }
    getFollowing(user) {
        return myFetch(URL + "/following/" + user, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }
    isFollowing(user) {
        return myFetch(URL + "/isFollowing/" + user, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }
}

export default FollowService;
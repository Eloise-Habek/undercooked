// import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const URL = "/api/follow";

class FollowService {
    constructor(props) {
        //this.setMessage = props.setMessage;
        this.postAction = this.postAction.bind(this);
    }
    follow(user) {
        return fetch(URL + "/" + user, {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        });
    }
    unfollow(user) {
        return fetch(URL + "/unfollow/" + user, {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        });
    }
}

export default FollowService;
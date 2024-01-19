import secureLocalStorage from "react-secure-storage";
import { myFetch } from "../functions/myFetch";

const URL = "/api/feed/recipes";

export default class FeedService {
    getRecipes() {
        return myFetch(URL, {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true)
    }
}
// import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { myFetch } from "../functions/myFetch";

const URL = "/api/recipes";

class RecipeService {
    getRecipe(id) {
        return myFetch(URL + "/" + id, {
            method: "GET",
            mode: "cors"
        }, false);
    }
    deleteRecipe(id) {
        return myFetch(URL + "/" + id, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true, false, false);
    }
    setRating(id, rating) {
        return myFetch(URL + "/" + id + "/rating", {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: JSON.stringify({ "rating": parseInt(rating) })
        }, true);
    }
    setSaved(id, saved) {
        return myFetch(URL + "/" + id + "/saved", {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: saved
        }, true);
    }
    getSavedCount(username) {
        return myFetch(URL + "/" + username + "/savedCount", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }
    getAllSaved(username) {
        return myFetch(URL + "/" + username + "/allSaved", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }
    isSaved(id) {
        return myFetch(URL + "/" + id + "/saved", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }

    getImage(recipe_id) {
        return myFetch(URL + "/" + recipe_id + "/image", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true, false, true)
    }
}

export default RecipeService;
import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { myFetch } from "../functions/myFetch";

const URL = "/api/recipes/";

class CommentService {
    constructor(props) {
        //this.setMessage = props.setMessage;
        this.postCommentAction = this.postCommentAction.bind(this);
        this.editCommentAction = this.editCommentAction.bind(this);

    }
    postComment(id, text) {
        return myFetch(URL + id + "/comments", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: JSON.stringify({ "text": text })
        }, true);
    }
    editComment(id, comment_id, text) {
        return myFetch(URL + id + "/comments/" + comment_id, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: JSON.stringify({ "text": text })
        }, true);
    }
    deleteComment(id, comment_id) {
        return myFetch(URL + id + "/comments/" + comment_id, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }
    async postCommentAction({ request }) {
        const data = await request.formData();
        //console.log(data.get("recipe_id"), data.get("text"));
        return this.postComment(data.get("recipe_id"), data.get("text"))
            .then(() => { }, () => { })
            .then(() => {
                return redirect("/recipe/" + data.get("recipe_id"))
            })
        // .then(() => {
        //     window.location.reload(false)
        // })
        // return redirect("/recipe/" + data.get("recipe_id"))
        //return null
    }
    async editCommentAction({ request }) {
        const data = await request.formData();
        console.log(data.get("recipe_id"), data.get("comment_id"), data.get("text"));
        this.editComment(data.get("recipe_id"), data.get("comment_id"), data.get("text"))
            .then(() => { }, () => { })
        // .then(() => {
        //     window.location.reload(false)
        // })
        return redirect("/recipe/" + data.get("recipe_id"))
    }
}

export default CommentService;
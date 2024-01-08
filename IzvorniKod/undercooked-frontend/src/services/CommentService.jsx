import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const URL = "/api/recipes/";

class CommentService {
    constructor(props) {
        //this.setMessage = props.setMessage;
        this.postCommentAction = this.postCommentAction.bind(this);
        this.editCommentAction = this.editCommentAction.bind(this);

    }
    postComment(id, text) {
        return fetch(URL + id + "/comments", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: JSON.stringify({ "text": text })
        });
    }
    editComment(id, comment_id, text) {
        return fetch(URL + id + "/comments/" + comment_id, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: JSON.stringify({ "text": text })
        });
    }
    deleteComment(id, comment_id) {
        return fetch(URL + id + "/comments/" + comment_id, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        });
    }
    async postCommentAction({ request }) {
        const data = await request.formData();
        //console.log(data.get("recipe_id"), data.get("text"));
        return this.postComment(data.get("recipe_id"), data.get("text"))
            .then(res => {
                if (res.ok) {
                    alert("Posted!");
                } else {
                    alert("Something went wrong!");
                }
            })
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
            .then(res => {
                if (res.ok) {
                    alert("Changed!");
                } else {
                    alert("Something went wrong!");
                }
            })
        // .then(() => {
        //     window.location.reload(false)
        // })
        return redirect("/recipe/" + data.get("recipe_id"))
    }
}

export default CommentService;
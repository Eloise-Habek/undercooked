// import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import FollowService from "./FollowService";
import MessageService from "./MessageService";
import { redirect } from "react-router-dom";
import { myFetch } from "../functions/myFetch";

const URL = "/api/recipes";

class PostRecipeService {
    constructor(props) {
        this.setMessage = props.setMessage;
        this.postAction = this.postAction.bind(this);
        this.editAction = this.editAction.bind(this);
        this.pullInputData = this.pullInputData.bind(this);

    }

    formatInput(data) {
        let input = {
            "name": "",
            "preparationTime": "",
            "description": "",
            "preparationDescription": "",
            "category": null,
            "cuisine": null,
            "youtubeEmbedId": null,
            "tags": [],
            "ingredients": []
        }
        input.name = data.get("title");
        if (data.get("time_h") === "0") {
            input.preparationTime = "PT" + data.get("time_min") + "M";
        } else {
            input.preparationTime = "PT" + data.get("time_h") + "H" + data.get("time_min") + "M";
        }

        input.description = data.get("description");
        input.preparationDescription = data.get("prep_desc");
        input.category = data.get("category");
        input.cuisine = data.get("cuisine");
        input.youtubeEmbedId = data.get("youtube_id");
        if (input.youtubeEmbedId === "") {
            input.youtubeEmbedId = null;
        }
        let i = 0;
        while (data.get("ingredient " + i.toString())) {
            let ing = {
                "amount": data.get("ingredient " + i.toString() + " amount"),
                "unitOfMeasure": data.get("ingredient " + i.toString() + " unitOfMeasure"),
                "ingredient": {
                    "name": data.get("ingredient " + i.toString())
                }
            }
            input.ingredients.push(ing);
            i++;
        }
        i = 0;
        let tagArray = [];
        while (data.get("tag " + i.toString())) {
            tagArray.push(data.get("tag " + i.toString()));
            i++;
        }
        input.tags = [...tagArray];
        return input;
    }

    postRecipe(recipe) {
        return myFetch(URL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: JSON.stringify(recipe)
        }, true);
    }
    updateRecipe(recipe, id) {
        return myFetch(URL + "/" + id, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: JSON.stringify(recipe)
        }, true);
    }
    setImage(recipe_id, data) {
        return myFetch(URL + "/" + recipe_id + "/image", {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken"),
                // "Content-Type": "multipart/form-data"
            },
            body: data
        }, true, false, true)
    }

    pullInputData(recipe_id) {
        var file = document.getElementById("recipe_image_input").files[0];
        if (file !== undefined) {
            let data = new FormData()
            data.append("file", file, file.name);
            return this.setImage(recipe_id, data);
        }
        return Promise.reject("File undifined!");
    }

    async postAction({ request }) {
        const data = await request.formData();
        let recipe = this.formatInput(data);
        return this.postRecipe(recipe).then((data) => {
            return this.pullInputData(data.id).then(() => { }, () => { })
                .then(() => {
                    //return redirect("/recipe/" + data.id);
                    return data.id;
                })
        }, () => {
            alert("something went wrong");
            return -1;
        })
            .then(async (res_1) => {
                let followService = new FollowService();
                let messageService = new MessageService();
                const res = await followService.getFollowers(secureLocalStorage.getItem("username"));
                res.forEach(element => {
                    let m = {
                        "text": "I just posted a new recipe! Check it out!",
                        "sender": secureLocalStorage.getItem("username"),
                        "receiver": element.username
                    };
                    messageService.notify(m).then(() => { }, () => { });
                });
                if (res_1 === -1) {
                    this.setMessage("Recipe not posted!");
                    return redirect("/")
                } else {
                    this.setMessage("Recipe posted!");
                    return redirect("/recipe/" + res_1);
                }
            })
    }

    async editAction({ request }) {
        const data = await request.formData();
        let recipe = this.formatInput(data);
        let recipe_id = data.get("recipe_id");
        return this.updateRecipe(recipe, recipe_id).then(() => {
            this.pullInputData(recipe_id).then(() => { }, () => { })
            this.setMessage("Recipe edited!");
            return redirect("/recipe/" + recipe_id);
        }, () => {
            this.setMessage("Editing failed!");
            return redirect("/recipe/" + recipe_id);
        })

        //return null;
    }
}

export default PostRecipeService;
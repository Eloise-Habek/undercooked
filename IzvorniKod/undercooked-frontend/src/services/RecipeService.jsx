// import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import FollowService from "./FollowService";
import MessageService from "./MessageService";
import { redirect } from "react-router-dom";
import { myFetch } from "../functions/myFetch";
import { myFetchBlob } from "../functions/myFetchBlob";

const URL = "/api/recipes";

class RecipeService {
    constructor(props) {
        //this.setMessage = props.setMessage;
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
            "ingredients": []
        }
        let ingredient = {
            "amount": null,
            "unitOfMeasure": "",
            "ingredient": {
                "name": ""
            }
        }
        input.name = data.get("title");
        if (data.get("time_h") === "0") {
            input.preparationTime = "PT" + data.get("time_min") + "M";
        } else {
            input.preparationTime = "PT" + data.get("time_h") + "H" + data.get("time_min") + "M";
        }

        input.description = data.get("description");
        input.preparationDescription = data.get("prep_desc");

        let iter = data.entries();
        let result = iter.next();
        let i = 0;
        let j = 0;
        while (!result.done) {
            let value = result.value;
            if (i >= 5 && value[0] !== "prep_desc") {
                if (j === 0) {
                    ingredient.ingredient.name = value[1];
                } else if (j === 1) {
                    ingredient.amount = value[1];
                } else if (j === 2) {
                    ingredient.unitOfMeasure = value[1];
                }
                j++;
                if (j === 3) {
                    let ing = {
                        "amount": ingredient.amount,
                        "unitOfMeasure": ingredient.unitOfMeasure,
                        "ingredient": {
                            "name": ingredient.ingredient.name
                        }
                    }
                    input.ingredients.push(ing);
                    j = 0;
                }
            }
            i++
            result = iter.next();
        }

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
        }, true);
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

    setImage(recipe_id, data) {
        return myFetchBlob(URL + "/" + recipe_id + "/image", {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken"),
                // "Content-Type": "multipart/form-data"
            },
            body: data
        }, true)
    }

    getImage(recipe_id) {
        return myFetchBlob(URL + "/" + recipe_id + "/image", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true)
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
                    messageService.sendMessage(m).then(() => { }, () => { });
                });
                if (res_1 === -1) {
                    return redirect("/")
                } else {
                    return redirect("/recipe/" + res_1);
                }
            })
    }

    async editAction({ request }) {
        const data = await request.formData();
        let recipe = this.formatInput(data);
        let recipe_id = data.get("recipe_id")
        return this.updateRecipe(recipe, recipe_id).then(() => {
            this.pullInputData(recipe_id).then(() => { }, () => { })
            return redirect("/recipe/" + recipe_id);
        }, () => redirect("/"))

        //return null;
    }
}

export default RecipeService;
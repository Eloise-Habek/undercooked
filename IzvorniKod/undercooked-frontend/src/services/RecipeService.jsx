// import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import FollowService from "./FollowService";
import MessageService from "./MessageService";

const URL = "/api/recipes";

class RecipeService {
    constructor(props) {
        //this.setMessage = props.setMessage;
        this.postAction = this.postAction.bind(this);
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
        return fetch(URL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: JSON.stringify(recipe)
        });
    }
    getRecipe(id) {
        return fetch(URL + "/" + id, {
            method: "GET",
            mode: "cors"
        });
    }
    async postAction({ request }) {
        const data = await request.formData();
        let recipe = this.formatInput(data);
        this.postRecipe(recipe).then(res => {
            if (res.ok) {
                alert("posted")
            } else {
                alert("something went wrong")
            }
        })

        let followService = new FollowService();
        let messageService = new MessageService();
        followService.getFollowers(secureLocalStorage.getItem("username"))
            .then(res => res.json()).then(res => {
                res.forEach(element => {
                    let m = {
                        "text": "I just posted a new recipe! Check it out!",
                        "sender": secureLocalStorage.getItem("username"),
                        "receiver": element.username
                    }
                    messageService.sendMessage(m);
                });
            });

        return null;
    }
}

export default RecipeService;
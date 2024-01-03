import { useEffect, useState } from "react"
import { Comment } from "../components/Comment"
import { CommentBox } from "../components/CommentBox"
import classes from "../styles/recipe/recipe.module.css"
import { NavLink, useParams } from "react-router-dom";
import { Footer } from "./wrapper/Footer";
import RecipeService from "../services/RecipeService";
import secureLocalStorage from "react-secure-storage";

function parseTime(time) {
    time = time.substring(2);
    let hours = null;
    if (time.includes("H")) {
        hours = time.split("H")[0];
    }
    let mins = null;
    if (time.includes("M") && time.includes("H")) {
        mins = time.substring(time.indexOf("H") + 1, time.indexOf("M"));
    }
    if (time.includes("M") && !time.includes("H")) {
        mins = time.substring(0, time.indexOf("M"));
    }
    time = (hours !== null ? hours + " h " : "") + (mins !== null ? mins + " min" : "");
    return time;
}

export function Recipe() {
    const [comment, setComment] = useState(0);
    let [details, setDetails] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        const recipeService = new RecipeService();
        recipeService.getRecipe(id).then(res => res.json()).then(res => setDetails([res]));
    })
    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.mini_wrapper}>
                    <div className={classes.name_and_image}>
                        <img src={require("./images/chef.png")} alt="" />
                        <NavLink to={details.length > 0 ? "/profile/" + details[0].author.username : null}>
                            <h2>{details.length > 0 ? details[0].author.username : "loading.."}</h2>
                        </NavLink>


                    </div>
                    <div>
                        <h2 className={classes.title}>{details.length > 0 ? details[0].name : "loading.."}</h2>
                    </div>
                    <div className={classes.edit_button_wrapper}>
                        {details.length > 0 &&
                            (details[0].author.username === secureLocalStorage.getItem("username") ||
                                "admin" === secureLocalStorage.getItem("username"))
                            ? <NavLink className={classes.edit_button} to={"/recipe/edit/" + id}>
                                <i class="fa-solid fa-pen"></i>
                            </NavLink> : null}
                    </div>
                </div>
                <div className={classes.image_container}>
                    <img
                        className={classes.images}
                        src={require("../pages/images/6978255.png")}
                        alt=""
                    />
                    <img
                        className={classes.images}
                        src={require("../pages/images/test_slika.jpg")}
                        alt=""
                    />
                    <img
                        className={classes.images}
                        src={require("../pages/images/6978255.png")}
                        alt=""
                    />
                    <img
                        className={classes.images}
                        src={require("../pages/images/6978255.png")}
                        alt=""
                    />
                    <img
                        className={classes.images}
                        src={require("../pages/images/test_slika.jpg")}
                        alt=""
                    />
                    slike ili videi
                </div>

                <div className={classes.descriptions_wrapper}>
                    <div className={classes.mini_description}>
                        {details.length > 0 ? details[0].description : "loading.."}
                    </div>
                    <div className={classes.prep_time}>
                        <h2>Preparation time:</h2>
                        {details.length > 0 ? "Preparation time: " + parseTime(details[0].preparationTime) : "loading.."}
                    </div>
                    <div className={classes.ingredients}>
                        <h2>Ingredients:</h2>
                        <ul>
                            {details.length > 0 ? details[0].ingredients.map((e) => {
                                return <li>{e.ingredient.name + ": " + e.amount + e.unitOfMeasure}</li>
                            }) : "loading.."}
                        </ul>
                    </div>
                </div>
                <div className={classes.description}>
                    <h1>Preparation:</h1>
                    {details.length > 0 ? details[0].preparationDescription : "loading.."}
                </div>

                <div className={classes.save_recipe}>Save Recipe</div>

                <div className={classes.comments_and_rate}>
                    <div className={classes.rate_stars}>
                        <div>Rate: </div>
                        <div>
                            <span className={"fa fa-star " + classes.checked}></span>
                            <span className={"fa fa-star " + classes.checked}></span>
                            <span className={"fa fa-star"}></span>
                            <span className={"fa fa-star"}></span>
                            <span className={"fa fa-star"}></span>
                        </div>
                    </div>
                    <div></div>
                    <button
                        onClick={() => {
                            comment ? setComment(0) : setComment(1);
                        }}
                    >
                        {comment ? "Close comment box" : "Write a comment"}
                    </button>

                    {comment ? <CommentBox /> : null}
                    <div className={classes.comments}> Comments: </div>
                    <Comment />
                    <Comment />
                    <Comment />
                    <Comment />
                </div>
            </div>
            <Footer sticky={1} />
        </>
    );

}
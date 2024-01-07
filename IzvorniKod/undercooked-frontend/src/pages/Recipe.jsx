import { useEffect, useState } from "react"
import { Comment } from "../components/Comment"
import { CommentBox } from "../components/CommentBox"
import classes from "../styles/recipe/recipe.module.css"
import star_classes from "../styles/recipe/stars.module.css"
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

function getMyRating(ratings) {
    let username = secureLocalStorage.getItem("username");
    for (var i = 0; i < ratings.length; i++) {
        if (ratings[i].person.username === username) {
            return ratings[i].rating;
        }
    }
    return 0;
}

export function Recipe() {
    const [comment, setComment] = useState(0);
    let [details, setDetails] = useState([]);
    let { id } = useParams();
    let recipeService = new RecipeService();
    const [saved, setSaved] = useState(0);
    let [comments, setComments] = useState([]);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const recipeService = new RecipeService();
        recipeService.getRecipe(id).then(res => res.json()).then(res => {
            var star_id = "stars-" + getMyRating(res.ratings).toString();
            if (star_id !== "stars-0") {
                document.getElementById(star_id).checked = true;
            }
            setDetails([res]);
            recipeService.isSaved(id).then(res => res.json()).then(res => {
                setSaved(res);
            })
            console.log("comments", res.comments);
            setComments(res.comments.map((e) => <>
                <Comment details={e} recipe_id={id} />
            </>));
            recipeService.getImage(id).then(res => res.blob()).then(data => URL.createObjectURL(data))
                .then(data => setImage(data))
        });
        console.log("useeffect")
    }, [id, setDetails, setComments])
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
                    {image === null ?
                        <img
                            className={classes.images}
                            src={require("../pages/images/6978255.png")}
                            alt=""
                        />
                        :
                        <img
                            className={classes.images}
                            src={image}
                            alt=""
                        />
                    }
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

                <button onClick={() => {
                    setSaved(!saved);
                    recipeService.isSaved(id).then(res => res.json()).then(saved => {
                        recipeService.setSaved(id, !saved).then(res => {
                            if (res.ok) {
                                alert("set ", saved);
                            } else {
                                alert("not ok");
                            }
                        })
                    })

                }} className={classes.save_recipe}>
                    {saved ? "Unsave Recipe" : "Save Recipe"}
                </button>

                <div className={classes.comments_and_rate}>
                    {details.length > 0 && details[0].averageRating !== null ?
                        <div>
                            {details[0].averageRating.toFixed(1)}
                            <span className={"fa fa-star " + classes.checked}></span>
                        </div>
                        : null}

                    <div className={classes.rate_stars}>

                        <div>Rate: </div>
                        <div>
                            <form className={star_classes.rating} onChange={() => {
                                if (details.length > 0) {
                                    recipeService.setRating(details[0].id,
                                        document.querySelector('input[name="stars"]:checked').value)
                                        .then(res => {
                                            if (res.ok) {
                                                alert("rating set");
                                            } else {
                                                alert("something went wrong");
                                            }
                                        })
                                }
                            }}>
                                <label>
                                    <input type="radio" name="stars" value="1" id="stars-1" />
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="2" id="stars-2" />
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="3" id="stars-3" />
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="4" id="stars-4" />
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                </label>
                                <label>
                                    <input type="radio" name="stars" value="5" id="stars-5" />
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                    <span className={star_classes.icon}>
                                        <span className={"fa fa-star"}></span>
                                    </span>
                                </label>
                            </form>
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

                    {comment ? <CommentBox recipe_id={id} /> : null}
                    <div className={classes.comments}> Comments: </div>
                    {comments.length > 0 ? [...comments].reverse() : ""}
                </div>
            </div>
            <Footer sticky={1} />
        </>
    );

}
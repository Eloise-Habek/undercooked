import { useEffect, useState } from "react"
// import { Comment } from "../components/Comment"
// import { CommentBox } from "../components/CommentBox"
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
    return <>
        <div className={classes.wrapper}>
            <div className={classes.mini_wrapper}>
                <div>
                    <img src={require("./images/chef.png")} alt="" />
                </div>
                <div><h2>{details.length > 0 ? details[0].author.username : "loading.."}</h2></div>
                <div><h2>{details.length > 0 ? details[0].name : "loading.."}</h2></div>
                {details.length > 0 &&
                    (details[0].author.username === secureLocalStorage.getItem("username") ||
                        "admin" === secureLocalStorage.getItem("username"))
                    ? <NavLink to={"/recipe/edit/" + id}>edit</NavLink> : null}

            </div>
            <div className={classes.image}>SLIKA</div>
            <div className={classes.description}>{details.length > 0 ? details[0].description : "loading.."}</div>
            <div className={classes.prep_time}>

                {details.length > 0 ? "Preparation time: " + parseTime(details[0].preparationTime) : "loading.."}
            </div>
            <div>
                <div>ingredients: </div>
                <div>
                    <ul>
                        {details.length > 0 ? details[0].ingredients.map((e) => {
                            return <li>{e.ingredient.name + ": " + e.amount + e.unitOfMeasure}</li>
                        }) : "loading.."}
                    </ul>
                </div>
            </div>
            <div className={classes.description}>{details.length > 0 ? details[0].preparationDescription : "loading.."}</div>
            <div>save recipe</div>
            <div className={classes.rate_stars}>
                <div>Rate: </div>
                <div>
                    <span class={"fa fa-star " + classes.checked}></span>
                    <span class={"fa fa-star " + classes.checked}></span>
                    <span class={"fa fa-star"}></span>
                    <span class={"fa fa-star"}></span>
                    <span class={"fa fa-star"}></span>
                </div>
            </div>
            <div><button onClick={() => { comment ? setComment(0) : setComment(1) }}>
                {comment ? "Close comment box" : "Write a comment"}
            </button></div>
            {/* {comment ? <CommentBox /> : null} */}

            <div> Comments: </div>
            {/* <Comment />
            <Comment />
            <Comment />
            <Comment /> */}
        </div>
        <Footer sticky={1} />
    </>

}
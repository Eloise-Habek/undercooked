import { useEffect, useMemo, useState } from "react"
import { Comment } from "../../components/Comment"
import { CommentBox } from "../../components/CommentBox"
import classes from "../../styles/recipe/recipe.module.css"
import star_classes from "../../styles/recipe/stars.module.css"
import { NavLink, useParams } from "react-router-dom";
import { Footer } from "../wrapper/Footer";
import RecipeService from "../../services/RecipeService";
import secureLocalStorage from "react-secure-storage";
import YoutubeEmbed from "../../components/YoutubeEmbed"

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

    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);
    const [desc, setDesc] = useState("");
    const [prepTime, setPrepTime] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [prepDesc, setPrepDesc] = useState("");
    const [avgRating, setAvgRating] = useState(null);
    const [embedId, setEmbedId] = useState("");

    let { id } = useParams();
    const recipeService = useMemo(() => new RecipeService(), []);
    const [saved, setSaved] = useState(0);
    let [comments, setComments] = useState([]);


    const [refresh, setRefresh] = useState(0);
    const [category, setCategory] = useState("");
    const [tagArray, setTagArray] = useState([]);

    setInterval(() => {
        if (refresh === -1) {
            setRefresh(refresh + 1);
        }
    }, 500)

    useEffect(() => {

        recipeService.getRecipe(id).then(res => {
            setTitle(res.name);
            setUsername(res.author.username);
            setDesc(res.description);
            setPrepTime(parseTime(res.preparationTime));
            setIngredients(res.ingredients.map((e) => {
                return <li key={e.ingredient.id}>{e.ingredient.name + ": " + e.amount + e.unitOfMeasure}</li>
            }))
            var i = 0;
            setTagArray(res.tags.map(e => {
                return <li key={i++}>{e}</li>
            }))
            setPrepDesc(res.preparationDescription);
            setAvgRating(res.averageRating);
            setEmbedId(res.youtubeEmbedId);
            var star_id = "stars-" + getMyRating(res.ratings).toString();
            if (star_id !== "stars-0") {
                document.getElementById(star_id).checked = true;
            }
            recipeService.isSaved(id).then(res => {
                setSaved(res);
            }, () => { setSaved(false) })
            setComments(res.comments.map((e) => <li key={e.id}>
                <Comment details={e} recipe_id={id} setRefresh={setRefresh} />
            </li>));
            recipeService.getImage(id).then(data => URL.createObjectURL(data), () => null)
                .then(data => setImage(data))
            setCategory(res.category)
        }, () => { });
    }, [id, refresh, recipeService])
    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.mini_wrapper}>
                    <div className={classes.name_and_image}>
                        <img src={require("../images/chef.png")} alt="" />
                        <NavLink to={"/profile/" + username}>
                            <h2>{username}</h2>
                        </NavLink>


                    </div>
                    <div>
                        <h2 className={classes.title}>{title}</h2>
                    </div>
                    <div className={classes.edit_button_wrapper}>
                        {(username === secureLocalStorage.getItem("username") ||
                            secureLocalStorage.getItem("isAdmin"))
                            ? <NavLink className={classes.edit_button} to={"/recipe/edit/" + id}>
                                <i className="fa-solid fa-pen"></i>
                            </NavLink> : null}
                    </div>
                </div>
                <div className={classes.image_container}>
                    {image === null ?
                        <img
                            className={classes.images}
                            src={require("../../pages/images/6978255.png")}
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
                        {desc}
                    </div>
                    <div className={classes.prep_time}>
                        <h2>Preparation time:</h2>
                        {prepTime}
                    </div>
                    <div className={classes.ingredients}>
                        <h2>Ingredients:</h2>
                        <ul>
                            {ingredients}
                        </ul>
                    </div>
                </div>
                <div className={classes.description}>
                    <h1>Preparation:</h1>
                    {prepDesc}

                    {embedId !== "" && embedId !== null && embedId !== undefined ?
                        <>
                            <h1>Video:</h1>
                            <YoutubeEmbed embedId={embedId} />
                        </>
                        : null}
                </div>
                <div className={classes.ingredients}>
                    <h2>Category:</h2>
                    {category}
                    {tagArray.length > 0 ? <h2>Tags:</h2> : null}
                    <ul>
                        {tagArray}
                    </ul>
                </div>

                <button onClick={() => {
                    setSaved(!saved);
                    recipeService.isSaved(id).then(saved => {
                        recipeService.setSaved(id, !saved).then(() => { }, () => { })
                    }, () => { })

                }} className={classes.save_recipe}>
                    {saved ? "Unsave Recipe" : "Save Recipe"}
                </button>

                <div className={classes.comments_and_rate}>
                    {avgRating !== null ?
                        <div>
                            {avgRating.toFixed(1)}
                            <span className={"fa fa-star " + classes.checked}></span>
                        </div>
                        : null}

                    <div className={classes.rate_stars}>

                        <div>Rate: </div>
                        <div>
                            <form className={star_classes.rating} onChange={() => {

                                recipeService.setRating(id,
                                    document.querySelector('input[name="stars"]:checked').value)
                                    .then(() => { }, () => { })
                                    .then(() => { setRefresh(refresh + 1) })

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
                    <button onClick={
                        () => {
                            comment ? setComment(0) : setComment(1)
                        }}>
                        {comment ? "Close comment box" : "Write a comment"}
                    </button>

                    {comment ? <CommentBox recipe_id={id} setRefresh={setRefresh} /> : null}
                    <div className={classes.comments}> Comments: </div>
                    <ul className={classes.no_bullets}>{comments.length > 0 ? [...comments].reverse() : ""}</ul>

                </div>
            </div>
            <Footer sticky={1} />
        </>
    );

}
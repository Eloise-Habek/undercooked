import { useState } from "react"
import { Comment } from "../components/Comment"
import { CommentBox } from "../components/CommentBox"
import classes from "../styles/recipe/recipe.module.css"
import { NavLink } from "react-router-dom";
import { Footer } from "./wrapper/Footer";

export function Recipe() {
    const [comment, setComment] = useState(0);
    return <>
        <div className={classes.wrapper}>
            <div className={classes.mini_wrapper}>
                <div>
                    <img src={require("./images/chef.png")} alt="" />
                </div>
                <div><h2>Username</h2></div>
                <div><h2>Naslov</h2></div>
                <NavLink to={"/editRecipe"}>edit</NavLink>
            </div>
            <div className={classes.image}>SLIKA</div>
            <div className={classes.description}>opis</div>
            <div className={classes.prep_time}>
                Preparation time: 30min
            </div>
            <div>
                <div>ingredients: </div>
                <div>
                    <ul>
                        <li>Coffee</li>
                        <li>Tea</li>
                        <li>Milk</li>
                    </ul>
                </div>
            </div>
            <div className={classes.description}>opis pripreme</div>
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
            {comment ? <CommentBox /> : null}

            <div> Comments: </div>
            <Comment />
            <Comment />
            <Comment />
            <Comment />
        </div>
        <Footer sticky={1} />
    </>

}
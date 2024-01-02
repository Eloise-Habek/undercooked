import { useState } from "react";
import { Comment } from "../components/Comment";
import { CommentBox } from "../components/CommentBox";
import classes from "../styles/recipe/recipe.module.css";
import { NavLink } from "react-router-dom";
import { Footer } from "./wrapper/Footer";

export function Recipe() {
  const [comment, setComment] = useState(0);

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.mini_wrapper}>
          <div className={classes.name_and_image}>
            <img src={require("./images/chef.png")} alt="" />
            <h2>Username</h2>
          </div>
          <div>
            <h2 className={classes.title}>Naslov naslov duži naslov</h2>
          </div>
          <div className={classes.edit_button_wrapper}>
            <NavLink className={classes.edit_button} to={"/editRecipe"}>
              edit
            </NavLink>
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
            src={require("../pages/images/6978255.png")}
            alt=""
          />
          slike ili videi
        </div>

        <div className={classes.descriptions_wrapper}>
          <div className={classes.mini_description}>
            Kraći opis jela/recepta, sifjaspfi awgpfaeriogew ačfiargj.
            aONQRWOIGJ SDFWF, WFIŠJARWEF.
          </div>
          <div className={classes.prep_time}>
            <h2>Preparation time:</h2>
            30min
          </div>
          <div className={classes.ingredients}>
            <h2>Ingredients:</h2>
            <ul>
              <li>Coffee</li>
              <li>Tea</li>
              <li>Milk</li>
            </ul>
          </div>
        </div>
        <div className={classes.description}>
          <h1>Description:</h1>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
          fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt
          mollit anim id est laborum.
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

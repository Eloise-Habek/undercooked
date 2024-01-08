import { NavLink } from "react-router-dom";
import classes from "../styles/comment/comment.module.css";
import secureLocalStorage from "react-secure-storage";
import { useState } from "react";
import { EditComment } from "./EditComment";
export function Comment({ details, recipe_id, setRefresh }) {
  const [edit, setEdit] = useState(0);
  if (edit) {
    return <EditComment details={details} recipe_id={recipe_id} setRefresh={setRefresh} />
  } else {
    return (
      <div className={classes.wrapper}>
        <div className={classes.img_and_username}>
          <NavLink to={details !== undefined ? "/profile/" + details.author.username : ""}>
            <img src={require("../pages/images/chef.png")} alt="profile_icon" />
          </NavLink>

          <div>{details !== undefined ? details.author.username : ""}</div>
        </div>

        {details.postedAt.split('T')[0].split('-').reverse().join('.') + ", " +
          details.postedAt.split('T')[1].split(':')[0] + ":" +
          details.postedAt.split('T')[1].split(':')[1]
        }
        <div className={classes.comment_text}>
          {details !== undefined ? details.text : ""}
        </div>
        {details.author.username === secureLocalStorage.getItem("username")
          || secureLocalStorage.getItem("isAdmin") ?
          <button type="button" onClick={() => setEdit(!edit)}><i class="fa-solid fa-pen"></i></button>
          : null
        }

      </div>
    );
  }

}

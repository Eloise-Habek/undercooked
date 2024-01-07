import { Form, NavLink } from "react-router-dom";
import classes from "../styles/comment/comment.module.css";
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState } from "react";
import { Comment } from "./Comment";
import CommentService from "../services/CommentService";

export function EditComment({ details, recipe_id }) {
  const [edit, setEdit] = useState(1);
  const commentService = new CommentService();
  useEffect(() => {
    if (details !== undefined && edit) {
      document.getElementById("text_input_" + details.id).value = details.text
    }
  })
  if (!edit) {
    return <Comment details={details} recipe_id={recipe_id} />
  }
  return (
    <Form className={classes.wrapper} method="put" action={"/recipe/" + recipe_id + "/comment/" + details.id}>
      <div className={classes.img_and_username}>
        <img src={require("../pages/images/chef.png")} alt="profile_icon" />
        <div>{details !== undefined ? details.author.username : ""}</div>
      </div>

      {details.postedAt.split('T')[0].split('-').reverse().join('.') + ", " +
        details.postedAt.split('T')[1].split(':')[0] + ":" +
        details.postedAt.split('T')[1].split(':')[1]
      }
      <div className={classes.comment_text}>
        <input name="text" id={"text_input_" + details.id} type="text" placeholder="Text..." />
        <input hidden type="text" name="recipe_id" value={recipe_id} />
        <input hidden type="text" name="comment_id" value={details.id} />
      </div>
      <button onClick={() => {
        setEdit(!edit)
      }} type="button">X</button>
      <button type="submit">Save changes</button>
      <button type="button" onClick={() => {
        commentService.deleteComment(recipe_id, details.id).then(res => {
          if (res.ok) {
            alert("deleted")
          } else {
            alert("something went wrong")
          }
        }).then(() => {
          window.location.reload(false)
        })
      }}>Delete</button>

    </Form>
  );
}

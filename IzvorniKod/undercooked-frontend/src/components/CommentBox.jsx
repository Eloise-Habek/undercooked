import { Form } from "react-router-dom";
import classes from "../styles/comment/commentbox.module.css";

export function CommentBox({ recipe_id, setRefresh }) {
  return (
    <div className={classes.wrapper}>
      <Form method="post" action={"/recipe/" + recipe_id + "/comment"} onSubmit={
        () => {
          setRefresh(-1);
        }
      }>
        <div>
          <textarea
            className={classes.text_box}
            id="freeform"
            name="text"
            rows="4"
            cols="50"
            placeholder="Enter text here..."
          >

          </textarea>
        </div>
        <input hidden type="text" name="recipe_id" value={recipe_id} readOnly />
        <button type="submit">Post comment</button>
      </Form>
    </div>
  );
}

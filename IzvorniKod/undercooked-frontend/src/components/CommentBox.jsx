import { Form } from "react-router-dom";
import classes from "../styles/comment/commentbox.module.css";

export function CommentBox() {
  return (
    <div className={classes.wrapper}>
      <Form method="post" action="/postComment">
        <div>
          <textarea
            className={classes.text_box}
            id="freeform"
            name="text"
            rows="4"
            cols="50"
          >
            Enter text here...
          </textarea>
        </div>
        <button type="submit">Post comment</button>
      </Form>
    </div>
  );
}
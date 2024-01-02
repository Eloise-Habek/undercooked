import classes from "../styles/message/message-box.module.css";
import { Form } from "react-router-dom";

export function SendMessageBox() {
  return (
    <div className={classes.message_box_wrapper}>
      <Form method="post" action="/sendMessage">
        <div className={classes.reply_column}>
          <label htmlFor="" className="register_label">
            To:
          </label>
          <input
            className={classes.text_fields}
            required
            type="text"
            name="username"
          />
        </div>
        <div className={classes.reply_column}>
          <textarea
            className={classes.text_fields}
            id="freeform"
            name="text"
            rows="4"
            cols="50"
          >
            Enter text here...
          </textarea>
        </div>
        <button className={classes.send_button} type="submit">
          Send
        </button>
      </Form>
    </div>
  );
}

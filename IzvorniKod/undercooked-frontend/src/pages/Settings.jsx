import { Form } from "react-router-dom";
import classes from "../styles/settings/settings.module.css";

export function Settings() {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.components}>
          <h2>Change username:</h2>
          <div>Current username: Username</div>
          <Form method="post" action="/lol">
            <div>
              <label htmlFor="">Type your new username: </label>
              <input
                className={classes.inputs}
                required
                type="text"
                name="username"
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </div>
        <div className={classes.components}>
          <h2>Change email:</h2>
          <div>Current email: mail@mail.com</div>
          <Form method="post" action="/lol">
            <div>
              <label htmlFor="">Type your new email: </label>
              <input
                className={classes.inputs}
                required
                type="email"
                name="email"
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </div>
        <div className={classes.components}>
          <h2>Change password:</h2>
          <Form method="post" action="/lol">
            <div>
              <label htmlFor="">Type your password: </label>
              <input
                className={classes.inputs}
                required
                type="password"
                name="password"
              />
            </div>
            <div>
              <label htmlFor="">New password: </label>
              <input
                className={classes.inputs}
                required
                type="password"
                name="new_password"
              />
            </div>
            <button type="submit">Submit</button>
          </Form>
        </div>
        <div className={classes.components}>
          <h2>Delete account:</h2>
          <Form method="post" action="/lol">
            <div>
              <label htmlFor="">Type your password: </label>
              <input
                className={classes.inputs}
                required
                type="password"
                name="password"
              />
            </div>
            <button className={classes.delete_btn} type="submit">
              Delete account
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

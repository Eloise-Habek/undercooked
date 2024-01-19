import { Form, NavLink } from "react-router-dom";
import classes from "../styles/login/login.module.css"
//import Header from './wrapper/Header';

export function Login() {
  return (
    <>
      <div className={classes.main_login_div}>
        <Form method="post" action="/login" className={classes.form_wrap}>
          <h2>Log in</h2>
          <div className={classes.columns}>
            <label htmlFor="" className={classes.input_label}>
              username:
            </label>
            <input
              required
              type="text"
              name="username"
              className={classes.input_field}
            />
          </div>
          <div className="columns">
            <label htmlFor="" className={classes.input_label}>
              password:
            </label>
            <input
              required
              type="password"
              name="password"
              className={classes.input_field}
            />
          </div>
          <button type="submit" className={classes.login_button}>
            Login
          </button>
          <NavLink className={classes.dontHaveAccount} to={"/register"}>
            Don't have an account?
          </NavLink>
        </Form>
      </div>
    </>
  );
}

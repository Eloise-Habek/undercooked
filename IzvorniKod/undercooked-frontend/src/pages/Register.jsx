import { Form } from "react-router-dom";
import classes from "../styles/login/register.module.css";

export function Register() {
  return (
    <>
      <div className={classes.register_wrap}>
        <Form method="post" action="/register" className={classes.register_form}>
          <h2>Register</h2>
          <div className={classes.user_data_input}>
            <label htmlFor="" className={classes.register_label}>
              email:
            </label>
            <input
              required
              type="email"
              name="email"
              className={classes.register_input}
            />
          </div>
          <div className={classes.user_data_input}>
            <label htmlFor="" className={classes.register_label}>
              name:
            </label>
            <input
              required
              type="text"
              name="name"
              className={classes.register_input}
            />
          </div>
          <div className={classes.user_data_input}>
            <label htmlFor="" className={classes.register_label}>
              surname:
            </label>
            <input
              required
              type="text"
              name="surname"
              className={classes.register_input}
            />
          </div>
          <div className={classes.user_data_input}>
            <label htmlFor="" className={classes.register_label}>
              username:
            </label>
            <input
              required
              type="text"
              name="username"
              className={classes.register_input}
            />
          </div>
          <div className={classes.user_data_input}>
            <label htmlFor="" className={classes.register_label}>
              password:
            </label>
            <input
              required
              type="password"
              name="password"
              className={classes.register_input}
            />
          </div>
          <button type="submit" className={classes.registerButton}>
            Register
          </button>
        </Form>
      </div>
    </>
  );
}

import { Form } from "react-router-dom";
import "../styles/login.css";
//import Header from './wrapper/Header';

export function Login() {
  return (
    <>
      <div className="main_login_div">
        <Form method="post" action="/login" className="form_wrap">
          <h1>Log in</h1>
          <div className="columns">
            <label htmlFor="" className="input_label">
              Username:
            </label>
            <input
              required
              type="text"
              name="username"
              className="input_field"
            />
          </div>
          <div className="columns">
            <label htmlFor="" className="input_label">
              Password:
            </label>
            <input
              required
              type="password"
              name="password"
              className="input_field"
            />
          </div>
          <button type="submit" className="login_button">
            Login
          </button>
        </Form>
      </div>
    </>
  );
}

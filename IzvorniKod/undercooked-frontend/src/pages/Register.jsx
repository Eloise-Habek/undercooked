import { Form } from "react-router-dom";
import "../styles/register.css";

export function Register() {
  return (
    <>
      <div className="register_wrap">
        <Form method="post" action="/register" className="register_form">
          <h2>Register</h2>
          <div className="user_data_input">
            <label htmlFor="" className="register_label">
              email:
            </label>
            <input
              required
              type="email"
              name="email"
              className="register_input"
            />
          </div>
          <div className="user_data_input">
            <label htmlFor="" className="register_label">
              name:
            </label>
            <input
              required
              type="text"
              name="name"
              className="register_input"
            />
          </div>
          <div className="user_data_input">
            <label htmlFor="" className="register_label">
              surname:
            </label>
            <input
              required
              type="text"
              name="surname"
              className="register_input"
            />
          </div>
          <div className="user_data_input">
            <label htmlFor="" className="register_label">
              username:
            </label>
            <input
              required
              type="text"
              name="username"
              className="register_input"
            />
          </div>
          <div className="user_data_input">
            <label htmlFor="" className="register_label">
              password:
            </label>
            <input
              required
              type="password"
              name="password"
              className="register_input"
            />
          </div>
          <button type="submit" className="registerButton">
            Register
          </button>
        </Form>
      </div>
    </>
  );
}

import { Form, NavLink } from 'react-router-dom'
import "../styles/login.css"
//import Header from './wrapper/Header';

export function Login() {

    return (
        <>
            <div className='main_login_div'>
                <Form method="post" action="/login" className='form_wrap'>
                    <h1>Log in</h1>
                    <div>
                        <label htmlFor="" className='input_label'>username:</label>
                        <input required type="text" name="username" className='input_field' />
                    </div>
                    <div>
                        <label htmlFor="" className='input_label'>password:</label>
                        <input required type="password" name="password" className='input_field' />
                    </div>
                    <button type="submit" className='login_button'>Login</button>
                    <NavLink to={"/register"}>Don't have an account?</NavLink>
                </Form>

            </div>
        </>
    )
}


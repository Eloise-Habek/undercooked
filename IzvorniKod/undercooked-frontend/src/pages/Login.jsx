import { Form } from 'react-router-dom'
import secureLocalStorage from "react-secure-storage";
import "../styles/login.css"
import LoginService from '../services/LoginService';
//import Header from './wrapper/Header';

export function Login({ changeIsLoggedIn }) {

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
                </Form>
            </div>
        </>
    )
}


// funkcija koja se pokreće kada radimo post request na /admin 
// (to nije post reqest na backend nego post request na frontend)
export const loginAction = async ({ request }) => {

    const data = await request.formData();
    let username = data.get("username")
    let user = "Basic " + btoa(username + ":" + data.get("password"));

    const handleErrors = response => {
        if (!response.ok) {
            secureLocalStorage.removeItem("logInToken");
            return null;
        }
        // OVO JE PRIVREMENO
        if (username === "admin") {
            secureLocalStorage.setItem("isAdmin", true);
        } else {
            secureLocalStorage.removeItem("isAdmin");
        }
        return response.json();
    }
    const saveToStorage = response => {
        if (response != null) {
            secureLocalStorage.setItem("logInToken", `Bearer ${response.token}`);
            return "login success";
        }
        return "login failed";
    }





    return LoginService.login(user).then(handleErrors).then(saveToStorage);
}

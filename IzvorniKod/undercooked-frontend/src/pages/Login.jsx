import { Form, redirect } from 'react-router-dom'
import secureLocalStorage from "react-secure-storage";
import "../styles/login.css"
import LoginService from '../services/LoginService';

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
                </Form>
            </div>
        </>
    )
}

// funkcija koja se pokreće kada radimo post request na /admin 
// (to nije post reqest na backend nego post request na frontend)
export const loginAction = async ({ request }) => {
    if (secureLocalStorage.getItem("logInToken") == null) {
        const data = await request.formData();
        let user = "Basic " + btoa(data.get("username") + ":" + data.get("password"));

        const handleErrors = response => {
            if (!response.ok) {
                alert("login failed");
                secureLocalStorage.removeItem("logInToken");
                return null;
            }
            alert("logged in");
            return response.json();
        }
        const saveToStorage = response => {
            if (response != null) {
                secureLocalStorage.setItem("logInToken", `Bearer ${response.token}`);
            }
        }

        LoginService.login(user).then(handleErrors).then(saveToStorage);

    }
    // alert("Allready signed in!");
    return redirect("/");
}

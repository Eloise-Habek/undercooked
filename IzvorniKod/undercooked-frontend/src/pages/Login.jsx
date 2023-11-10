import { Form, redirect } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage";
import Nav from './wrapper/Nav'
import "../styles/login.css"
import LoginService from '../services/LoginService';

export function Login() {
    return (
        <>
        <div className='main_login_div'>
            <h1>Log in</h1>
            <Form method="post" action="/login" className='form_wrap'>
                <div>
                    <label htmlFor="" className='input_label'>username:</label>
                    <input required type="text" name="username" className='input_field'/>
                </div>
                <div>
                    <label htmlFor="" className='input_label'>password:</label>
                    <input required type="password" name="password" className='input_field'/>
                </div>           
                <button type="submit" className='login_button'>Login</button>
            </Form>
        </div>
        </>
    )
}


export const loginAction = async ({request}) => {
    if (secureLocalStorage.getItem("logInToken") == null) {
        const data = await request.formData();
        let user = "Basic " + btoa(data.get("username")+":"+data.get("password"));
        
        //const response = await LoginService.login(user);
        const response = await fetch("http://localhost:8080/api/", {
            method: "GET",
            headers: {
                "Authorization": user
            }
        });

        if (response.status === 200) {
            secureLocalStorage.setItem('logInToken', user);
            return redirect("/");
        } else {
            secureLocalStorage.removeItem("logInToken");
            alert("Invalid credentials");
            return redirect("/login");
        }
    }
    alert("Allready signed in!");
    return redirect("/");
}

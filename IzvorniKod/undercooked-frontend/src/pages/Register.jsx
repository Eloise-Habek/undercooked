import { Form, redirect } from 'react-router-dom'
import "../styles/register.css"
import RegisterService from '../services/RegisterService';

export function Register() {
    return (
        <>
            <div className='register_wrap'>
                <Form method="post" action="/register" className='register_form'>
                    <h1>Register</h1>
                    <div className='user_data_input'>
                        <label htmlFor="" className='register_label'>email:</label>
                        <input required type="email" name="email" className='register_input' />
                    </div>
                    <div className='user_data_input'>
                        <label htmlFor="" className='register_label'>name:</label>
                        <input required type="text" name="name" className='register_input' />
                    </div>
                    <div className='user_data_input'>
                        <label htmlFor="" className='register_label'>surname:</label>
                        <input required type="text" name="surname" className='register_input' />
                    </div>
                    <div className='user_data_input'>
                        <label htmlFor="" className='register_label'>username:</label>
                        <input required type="text" name="username" className='register_input' />
                    </div>
                    <div className='user_data_input'>
                        <label htmlFor="" className='register_label'>password:</label>
                        <input required type="password" name="password" className='register_input' />
                    </div>
                    <button type="submit" className='registerButton'>Register</button>
                </Form>
            </div>

        </>
    )
}

// funkcija koja se pokreće kada radimo post request na /admin 
// (to nije post reqest na backend nego post request na frontend)
export const registerAction = async ({ request }) => {
    const data = await request.formData();
    let user = {
        "email": data.get("email"),
        "username": data.get("username"),
        "password": data.get("password"),
        "name": data.get("name"),
        "surname": data.get("surname")
    }

    const response = await RegisterService.register(user);

    if (response.status === 200) {
        alert("User registered!");
        return redirect("/login");
    } else {
        alert("registration failed");
        return redirect("/register");
    }
}
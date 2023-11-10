import { Form, redirect } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';
//import RegisterService from '../services/RegisterService'
import "../styles/register.css"

export function Register() {
    return (
        <>
        <div className='register_wrap'>
            <h1>Register</h1>
            <Form method="post" action="/register" className='register_form'>
                <div className='user_data_input'>
                    <label htmlFor="" className='register_label'>email:</label>
                    <input required type="email" name="email" className='register_input'/>
                </div>
                <div className='user_data_input'>
                    <label htmlFor="" className='register_label'>name:</label>
                    <input  type="text" name="name" className='register_input'/>
                </div>
                <div className='user_data_input'>
                    <label htmlFor="" className='register_label'>surname:</label>
                    <input  type="text" name="surname" className='register_input'/>
                </div>
                <div className='user_data_input'>
                    <label htmlFor="" className='register_label'>username:</label>
                    <input required type="text" name="username" className='register_input'/>
                </div>
                <div className='user_data_input'>
                    <label htmlFor="" className='register_label'>password:</label>
                    <input required type="password" name="password" className='register_input'/>
                </div>           
                <button type="submit" className='registerButton'>Register</button>
            </Form>
        </div>
        
        </>
    )
}

export const registerAction = async ({request}) => {
    const data = await request.formData();
    let user =  {
        "email": data.get("email"),
        "username": data.get("username"),
        "password": data.get("password"),
        "name": data.get("name"),
        "surname": data.get("surname")
    }
   
    console.log(user);
    fetch("http://localhost:8080/api/register", {
        method: "POST",
        mode: 'cors',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    }).then(() => {
        console.log("dodan")
    })

    return redirect("/");
}
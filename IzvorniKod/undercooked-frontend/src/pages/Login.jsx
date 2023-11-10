import { Form, redirect } from 'react-router-dom'
import  secureLocalStorage  from  "react-secure-storage";
import Nav from './wrapper/Nav'
import "../styles/login.css"

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
    const data = await request.formData();
    let user = "Basic " + btoa(data.get("username")+":"+data.get("password"));

// ovo prebaciti u axios
    
    const response = await fetch('http://localhost:8080/api/', {
        method: "GET",
        mode: 'cors',
        headers: {
            "Authorization": user
        },
      });

      if (response.status === 200) {
        secureLocalStorage.setItem('logInToken', user);
      } else {
        secureLocalStorage.removeItem("logInToken");
        throw new Error('Invalid credentials');
      }
    //window.location.reload(false);
    return redirect("/");
}

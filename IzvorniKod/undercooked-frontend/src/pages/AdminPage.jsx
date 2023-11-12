import { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import { Form, redirect, useNavigate, useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import "../styles/adminpage.css"

export function AdminPage() {
    const [users, setUsers] = useState([]);
    let { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        const handleErrors = response => {
            if (!response.ok) {
                navigate("/");
            }
            return response;
        }
        if(secureLocalStorage.getItem("logInToken") != null) {
            if (id === undefined) {
                AdminService.getUsers().then(handleErrors).then(res => res.json()).then(d => setUsers(d));
            } else {
                AdminService.getUserById(id).then(res => res.json()).then(res => {               
                    // if bi trebao biti === 200 ali nije radilo
                    if (res.status === 404) {
                        alert("User with id " + id + " doesn't exist!");
                        navigate("/admin");
                    } else {
                        setUsers([res]);
                    }
                });
            }
        } else {
            navigate("/login");
        }

        
        
    }, [id, navigate]);
    return (
            <div>
                <div className="container">
                    <Form method="post" action="/admin" className='container'>
                <div>
                    <label htmlFor="" className='input_label'>Get by ID:</label>
                    <input required type="text" name="userId" className='input_field'/>
                </div>           
                <button type="submit" className='btn btn-info'>Submit</button>
                <button type="button" onClick={() => {navigate("/admin")}} className='btn btn-danger'>X</button>
                </Form>
                </div>
                <div className='container'>
                <div className='row'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                user => 
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td><button className='btn btn-info' onClick={() => {AdminService.removeUser(user.id); window.location.reload(false)}}>Remove</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
                </div>
            </div>
        ); 
}

//Ovo je jako glitchavo ne znam zašto izgleda mi ok
export const getById = async ({request}) => {
    const data = await request.formData();
    let id = data.get("userId");
    return redirect("/admin/" + id);
}
import { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import { Form } from 'react-router-dom';

export function AdminPage() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        AdminService.getUsers().then(res => res.json()).then(res => {
            setUsers(res);
        });
    });
    return (
            <div>
                <Form className='container' method='post' action="/admin">                                    
                    <div>
                        <label htmlFor=""> Get By ID: </label>
                        <input required type="text" name="id" />
                        <button className='btn btn-info' type="submit">Submit</button>
                        <button className='btn btn-info' type='button' onClick={() => {/*</div>secureLocalStorage.removeItem("id"); window.location.reload(false);*/}}>Reset</button>
                    </div>                                    
                </Form>
                <div className='container'>
                <div className='row'>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
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
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td><button className='btn btn-info' onClick={() => {AdminService.removeUser(user.id);  window.location.reload(false);}}>Remove</button></td>
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
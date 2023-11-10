import React, { Component } from 'react';
import AdminService from '../services/AdminService';
import { Form, redirect } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';


// TO DO: reimplementirati sortiranje po id
// greška je bila u tome što više nisam vraćao [] nego {} i to ga je zbunilo
class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        
    }

    componentDidMount() {
        // if (secureLocalStorage.getItem("id") == null) {
        //     fetch("http://localhost:8080/api/persons", {
        //         method: "GET",
        //         headers: {
        //             "Authorization": secureLocalStorage.getItem("logInToken")
        //         }
        //     }).then(res => {
        //         this.setState({users: res.data})
        //     });

        //     // AdminService.getUsers().then(res => {
        //     //     this.setState({users: res.data})
        //     // });
        // } else {
        //     fetch("http://localhost:8080/api/persons/" + secureLocalStorage.getItem("id").toString(), {
        //         method: "GET",
        //         headers: {
        //             "Authorization": secureLocalStorage.getItem("logInToken")
        //         }
        //     }).then(res => {
        //         this.setState([{users: res.data}])
        //     });
        // }
        fetch("http://localhost:8080/api/persons", {
                method: "GET",
                headers: {
                    "Authorization": secureLocalStorage.getItem("logInToken")
                }
            }).then(res => {
                this.setState([{users: res.data}])
            });
        
    }

    
    render() {
        return (
            <div>
                <Form className='container' method='post' action="/admin">                                    
                    <div>
                        <label htmlFor=""> Get By ID: </label>
                        <input required type="text" name="id" />
                        <button className='btn btn-info' type="submit">Submit</button>
                        <button className='btn btn-info' type='button' onClick={() => {secureLocalStorage.removeItem("id"); window.location.reload(false);}}>Reset</button>
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
                            this.state.users.map(
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
}

export default AdminPage;
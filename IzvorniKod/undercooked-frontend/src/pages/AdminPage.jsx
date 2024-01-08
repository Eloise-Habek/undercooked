import { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import { Form, redirect, useNavigate, useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import "../styles/adminpage.css"

export function AdminPage() {
    const [users, setUsers] = useState([]); // stanje funkcije -> analog atributa klase
    let { id } = useParams(); // korištenje /:id
    const navigate = useNavigate(); //omogućuje preusmjeravanje na drugu rutu

    // funkcija koja se učitava pri prvom učitavanju komponente i pri update-u
    useEffect(() => {
        // ako server ne pošalje 200 OK onda navigacija na home
        const handleErrors = response => {
            if (!response.ok) {
                navigate("/");
            }
            return response;
        }
        // ako server ne pošalje 200 OK onda navigacija na admin
        const handleErrors2 = response => {
            if (!response.ok) {
                navigate("/admin");
            }
            return response;
        }
        // ako  nismo ulogirani (ne postoji log in token) onda navigacija na login
        if (secureLocalStorage.getItem("logInToken") != null) {
            // ako ne koristimo parametar /:id
            // šalji request na server za sve korisnike i promijeni stanje funkcije da sadrži server response
            if (id === undefined) {
                AdminService.getUsers().then(handleErrors).then(res => res.json()).then(d => setUsers(d));
            } else { // inače šalji request za dobiti korisnika po id-u i promijeni stanje funkcije da sadrži server response
                AdminService.getUserById(id).then(handleErrors2).then(res => res.json()).then(d => setUsers([d]));
            }
        } else {
            navigate("/login");
        }
    }, [id, navigate]); // variable o kojima funkcija ovisi (bitno da react zna kada ponovno učitati komponentu)

    return (
        <div>
            <div className="container">
                {/*Form šalje post request na /admin s podatkom o id*/}
                <Form method="post" action="/admin" className='container'>
                    <div>
                        <label htmlFor="" className='input_label'>Get by ID:</label>
                        <input required type="text" name="userId" className='input_field' />
                    </div>
                    <button type="submit" className='btn btn-info'>Submit</button>
                    <button type="button" onClick={() => { navigate("/admin") }} className='btn btn-danger'>X</button>
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
                                <th>Is Admin?</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(
                                user =>
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.name}</td>
                                        <td>{user.surname}</td>
                                        <td><button className='btn btn-info' onClick={() => { AdminService.removeUser(user.id).then(() => { window.location.reload(false) }) }}>Remove</button></td>
                                        <td>{user.admin.toString()}</td>
                                        <td><button className='btn btn-info' onClick={() => { AdminService.setAdmin(user.id, !user.admin).then(() => { window.location.reload(false) }) }}>Change</button></td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// funkcija koja se pokreće kada radimo post request na /admin 
// (to nije post reqest na backend nego post request na frontend)
export const getById = async ({ request }) => {
    const data = await request.formData();
    let id = data.get("userId");
    return redirect("/admin/" + id);
}
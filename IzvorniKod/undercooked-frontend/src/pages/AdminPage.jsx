import { useEffect, useMemo, useState } from "react";
import { Form, redirect, useNavigate, useParams } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import "../styles/adminpage.css"
import AdminService from "../services/AdminService";

export function AdminPage() {
    const [users, setUsers] = useState([]); // stanje funkcije -> analog atributa klase
    const [refresh, setRefresh] = useState(0);
    let { id } = useParams(); // korištenje /:id
    const navigate = useNavigate(); //omogućuje preusmjeravanje na drugu rutu
    const adminService = useMemo(() => new AdminService(), [])

    // funkcija koja se učitava pri prvom učitavanju komponente i pri update-u
    useEffect(() => {
        // ako  nismo ulogirani (ne postoji log in token) onda navigacija na login
        if (secureLocalStorage.getItem("logInToken") != null) {
            // ako ne koristimo parametar /:id
            // šalji request na server za sve korisnike i promijeni stanje funkcije da sadrži server response
            if (id === undefined) {
                adminService.getUsers().then(d => setUsers(d), () => { navigate("/"); });
            } else { // inače šalji request za dobiti korisnika po id-u i promijeni stanje funkcije da sadrži server response
                adminService.getUserById(id).then(d => setUsers([d]), () => { navigate("/admin"); });
            }
        } else {
            navigate("/login");
        }
    }, [id, navigate, adminService, refresh]); // variable o kojima funkcija ovisi (bitno da react zna kada ponovno učitati komponentu)

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
                                        <td><button className='btn btn-info'
                                            onClick={() => {
                                                adminService.removeUser(user.id)
                                                .then(() => { setRefresh(refresh + 1) }, () => { setRefresh(refresh + 1) })
                                            }}>
                                            Remove
                                        </button></td>
                                        <td>{user.admin.toString()}</td>
                                        <td><button className='btn btn-info'
                                            onClick={() => {
                                                adminService.setAdmin(user.id, !user.admin)
                                                .then(() => { setRefresh(refresh + 1) }, () => { setRefresh(refresh + 1) })
                                            }}>
                                            Change
                                        </button></td>
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
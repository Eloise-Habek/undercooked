import { useEffect, useMemo, useState } from "react";
import {
  Form,
  NavLink,
  redirect,
  useNavigate,
  useParams,
} from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import classes from "../styles/admin/adminpage.module.css"
import AdminService from "../services/AdminService";

export function AdminPage() {
  const [users, setUsers] = useState([]); // stanje funkcije -> analog atributa klase
  const [refresh, setRefresh] = useState(0);
  let { id } = useParams(); // korištenje /:id
  const navigate = useNavigate(); //omogućuje preusmjeravanje na drugu rutu
  const adminService = useMemo(() => new AdminService(), []);

  // funkcija koja se učitava pri prvom učitavanju komponente i pri update-u
  useEffect(() => {
    // ako  nismo ulogirani (ne postoji log in token) onda navigacija na login
    if (secureLocalStorage.getItem("logInToken") != null) {
      // ako ne koristimo parametar /:id
      // šalji request na server za sve korisnike i promijeni stanje funkcije da sadrži server response
      if (id === undefined) {
        adminService.getUsers().then(
          (d) => setUsers(d),
          () => {
            navigate("/");
          }
        );
      } else {
        // inače šalji request za dobiti korisnika po id-u i promijeni stanje funkcije da sadrži server response
        adminService.getUserById(id).then(
          (d) => setUsers([d]),
          () => {
            navigate("/admin");
          }
        );
      }
    } else {
      navigate("/login");
    }
  }, [id, navigate, adminService, refresh]); // variable o kojima funkcija ovisi (bitno da react zna kada ponovno učitati komponentu)

  return (
    <div className={classes.wrapper}>
      <header className={classes.admin_header}>
        <div>
          <NavLink className={classes.users_stats_btn} to={"/admin"}>
            Users
          </NavLink>
        </div>
        <div>
          <NavLink className={classes.users_stats_btn} to={"/admin/stats"}>
            Stats
          </NavLink>
        </div>
      </header>

      <div className={classes.form_container}>
        {/*Form šalje post request na /admin s podatkom o id*/}
        <Form method="post" action="/admin">
          <div>
            <label htmlFor="">
              Get by ID:
            </label>
            <input required type="text" name="userId" />
          </div>
          <button type="submit" className={classes.btn_info}>
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              navigate("/admin");
            }}
            className={classes.btn_danger}
          >
            X
          </button>
        </Form>
      </div>
      <div>
        <div>
          <table>
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td><NavLink to={"/profile/" + user.username}> {user.username}</NavLink></td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>
                    <button
                      className={classes.btn_info}
                      onClick={() => {
                        adminService.removeUser(user.id).then(
                          () => {
                            setRefresh(refresh + 1);
                          },
                          () => {
                            setRefresh(refresh + 1);
                          }
                        );
                      }}
                    >
                      Remove
                    </button>
                  </td>
                  <td>{user.admin.toString()}</td>
                  <td>
                    <button
                      className={classes.btn_info}
                      onClick={() => {
                        adminService.setAdmin(user.id, !user.admin).then(
                          () => {
                            setRefresh(refresh + 1);
                          },
                          () => {
                            setRefresh(refresh + 1);
                          }
                        );
                      }}
                    >
                      Change
                    </button>
                  </td>
                </tr>
              ))}
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
};

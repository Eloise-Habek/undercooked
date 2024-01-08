import secureLocalStorage from "react-secure-storage";

const URL = "/api/persons";

class AdminService {
  // šalje get request na backend i vraća response sa servera u obliku js promise
  // služi za vraćanje svih registriranih korisnika
  getUsers() {
    return fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    });
  }
  // šalje delete request, služi za brisanje korisnika
  removeUser(id) {
    return fetch(URL + "/" + id.toString(), {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    })
  }
  // šalje get request, služi za dobivanje korisnika s određenim id-om
  getUserById(id) {
    return fetch(URL + "/" + id.toString(), {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    })
  }

  setAdmin(id, admin) {
    return fetch(URL + "/" + id.toString() + "/admin", {
      method: "POST",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(admin)
    })
  }
}

export default new AdminService();



import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const server = "http://localhost:8080";
const URL = server + "/api/persons";

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
}

export default new AdminService();


  
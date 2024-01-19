import secureLocalStorage from "react-secure-storage";
import { myFetch } from "../functions/myFetch";

const URL = "/api/persons";
const statURL = "/api/admin/stats/";

export default class AdminService {
  // šalje get request na backend i vraća response sa servera u obliku js promise
  // služi za vraćanje svih registriranih korisnika
  getUsers() {
    return myFetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    }, true);
  }
  // šalje delete request, služi za brisanje korisnika
  removeUser(id) {
    return myFetch(URL + "/" + id.toString(), {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    }, true)
  }
  // šalje get request, služi za dobivanje korisnika s određenim id-om
  getUserById(id) {
    return myFetch(URL + "/" + id.toString(), {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    }, true)
  }

  setAdmin(id, admin) {
    return myFetch(URL + "/" + id.toString() + "/admin", {
      method: "POST",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(admin)
    }, true)
  }

  getBestRatedRecipe() {
    return myFetch(statURL + "bestRatedRecipe", {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    }, true)
  }

  getMostSavedRecipe() {
    return myFetch(statURL + "mostSavedRecipe", {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    }, true)
  }

  getMostActiveUser() {
    return myFetch(statURL + "mostActiveUser", {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    }, true)
  }
}




import secureLocalStorage from "react-secure-storage";
import { myFetch } from "../functions/myFetch";

const URL = "/api/profile";

export default class ProfileService {
  // šalje get request na backend i vraća response sa servera u obliku js promise
  // služi za vraćanje podataka o profilu korisnika
  getProfile(username) {
    return myFetch(URL + "/" + username, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      },
    }, true)
  }
}



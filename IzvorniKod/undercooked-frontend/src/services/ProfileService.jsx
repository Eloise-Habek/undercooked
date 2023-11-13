import secureLocalStorage from "react-secure-storage";

const server = "http://localhost:8080";
const URL = server + "/api/profile";

class ProfileService {
  // šalje get request na backend i vraća response sa servera u obliku js promise
  // služi za vraćanje podataka o profilu korisnika
  getProfile() {
    return fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    })
  }
}

export default new ProfileService();


  
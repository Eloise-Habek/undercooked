import secureLocalStorage from "react-secure-storage";

const URL = "/api/profile";

class ProfileService {
  // šalje get request na backend i vraća response sa servera u obliku js promise
  // služi za vraćanje podataka o profilu korisnika
  getProfile(username) {
    return fetch(URL + "/" + username, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      },
    })
  }
}

export default new ProfileService();



import secureLocalStorage from "react-secure-storage";

const server = "http://localhost:8080";
const URL = server + "/api/persons";

class AdminService {
  getUsers() {
    return fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    })
  }
  removeUser(id) {
    return fetch(URL + "/" + id.toString(), {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")  
      }
    })
  }
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


  
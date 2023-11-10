import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const server = "http://localhost:8080";
const URL = server + "/api/persons";

class AdminService {
  getUsers() {
    return axios.get(URL,{     
      headers: {
      "Authorization": secureLocalStorage.getItem("logInToken")
    }})
  }
  removeUser(id) {
    return axios.delete((URL + "/" + id.toString()),{     
      headers: {
      "Authorization": secureLocalStorage.getItem("logInToken")
    }})
  }
  getUserById(id) {
    return axios.get((URL + "/" + id.toString()),{     
      headers: {
      "Authorization": secureLocalStorage.getItem("logInToken")
    }})
  }
}

export default new AdminService();


  
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const server = "http://localhost:8080";
const URL = server + "/api/profile";

class ProfileService {
  getProfile() {
    return axios.get(URL,{     
      headers: {
      "Authorization": secureLocalStorage.getItem("logInToken")
    }})
  }
}

export default new ProfileService();


  
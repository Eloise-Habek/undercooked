import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const URL = "http://localhost:8080/api/profile";

class ProfileService {
  getProfile() {
    return axios.get(URL,{     
      headers: {
      "Authorization": secureLocalStorage.getItem("logInToken")
    }})
  }
}

export default new ProfileService();


  
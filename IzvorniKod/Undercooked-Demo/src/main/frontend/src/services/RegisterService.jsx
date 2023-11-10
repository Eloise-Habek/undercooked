import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/register";

class RegisterService {
  registerUser(user) {
    return axios.get(EMPLOYEE_API_BASE_URL,{
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
    }});
  }
}

export default new RegisterService();
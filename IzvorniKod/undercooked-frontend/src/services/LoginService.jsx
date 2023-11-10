import axios from "axios";

const server = "http://localhost:8080";
const URL = server + "/api/";

class LoginService {
  login (user) {
    return axios.get(URL, {
      headers: {
        "Authorization": user
      }
    });
  }
}

export default new LoginService();
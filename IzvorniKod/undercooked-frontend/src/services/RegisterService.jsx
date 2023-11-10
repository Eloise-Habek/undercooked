import axios from "axios";

const server = "http://localhost:8080";
const URL = server + "/api/register";

class RegisterService {
  register(user) {
    return axios.post(URL, JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
}

export default new RegisterService();
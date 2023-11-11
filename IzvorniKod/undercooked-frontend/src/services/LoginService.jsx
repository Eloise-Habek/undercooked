const server = "http://localhost:8080";
const URL = server + "/api/";

class LoginService {
  login (user) {
    return fetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": user
      }
    });
  }
}

export default new LoginService();
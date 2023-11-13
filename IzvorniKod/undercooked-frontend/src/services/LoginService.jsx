const server = "http://localhost:8080";
const URL = server + "/api/";

class LoginService {
  // šalje get request na backend s headerom za basic auth
  // služi za log in
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
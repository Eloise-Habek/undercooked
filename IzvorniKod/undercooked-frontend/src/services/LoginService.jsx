const URL = "/api/token";

class LoginService {
  // šalje post request na backend s headerom za basic auth
  // služi za log in
  login(user) {
    return fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Authorization": user
      }
    });
  }
}

export default new LoginService();
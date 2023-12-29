import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const URL = "/api/token";

class LoginService {
  constructor(props) {
    this.setIsLoggedIn = props.setIsLoggedIn;
    this.setIsAdmin = props.setIsAdmin;
    this.setMessage = props.setMessage;
    this.loginAction = this.loginAction.bind(this);
  }
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

  // funkcija koja se pokreće kada radimo post request na /admin 
  // (to nije post reqest na backend nego post request na frontend)
  async loginAction({ request }) {
    const data = await request.formData();
    let username = data.get("username")
    let user = "Basic " + btoa(username + ":" + data.get("password"));

    return this.login(user).then((response) => {
      return response.json();
    }).then((response) => {
      let res = {
        "loggedIn": false,
        "admin": false,
        "message": "Invalid credentials!",
        "token": null
      };
      if (response.token) {
        res.loggedIn = true;
        res.message = "Logged in!";
        res.token = response.token;
        if (username === "admin") {
          res.admin = true;
        }
      }
      return res;
    })
      .then((response) => {
        if (response.loggedIn) {
          secureLocalStorage.setItem("logInToken", `Bearer ${response.token}`);
          secureLocalStorage.setItem("username", username);
          if (response.admin) {
            secureLocalStorage.setItem("isAdmin", true);
            this.setIsAdmin(true);
          } else {
            secureLocalStorage.removeItem("isAdmin");
            this.setIsAdmin(false);
          }
        } else {
          secureLocalStorage.removeItem("logInToken");
          secureLocalStorage.removeItem("username");
        }
        return response;
      })
      .then((response) => {
        this.setMessage(response.message);
        if (response.loggedIn) {
          this.setIsLoggedIn(true);
          return redirect("/");
        } else {
          this.setIsLoggedIn(false);
          return redirect("/login");
        }
      })
  }
}

export default LoginService;
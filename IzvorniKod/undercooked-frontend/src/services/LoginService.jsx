import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { myFetch } from "../functions/myFetch";

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
    return myFetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Authorization": user
      }
    }, false);
  }
  checkAdmin(username) {

    return myFetch("/api/profile/" + username, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    }, true).then(data => {
      if (data !== null) {
        return myFetch("/api/persons/" + data.id.toString() + "/admin", {
          method: "GET",
          mode: "cors",
          headers: {
            "Authorization": secureLocalStorage.getItem("logInToken")
          }
        }, true)
      }
      return null;
    })


  }

  // funkcija koja se pokreće kada radimo post request na /admin 
  // (to nije post reqest na backend nego post request na frontend)
  async loginAction({ request }) {
    const data = await request.formData();
    let username = data.get("username")
    let user = "Basic " + btoa(username + ":" + data.get("password"));

    return this.login(user).then(data1 => {
      if (data1 !== null) {
        secureLocalStorage.setItem("logInToken", `Bearer ${data1.token}`);
        return this.checkAdmin(username).then(res => {
          console.log(res)
          secureLocalStorage.setItem("username", username);
          this.setIsLoggedIn(true);
          this.setMessage("Logged in!");
          res ? this.setIsAdmin(true) : this.setIsAdmin(false);
          res ? secureLocalStorage.setItem("isAdmin", true) : secureLocalStorage.setItem("isAdmin", false);
          return redirect("/profile/" + username);
        })
      }
      secureLocalStorage.removeItem("logInToken");
      secureLocalStorage.removeItem("username");
      secureLocalStorage.removeItem("isAdmin");
      this.setIsAdmin(false);
      this.setIsLoggedIn(false);
      this.setMessage("Invalid credentials!");
      return redirect("/login")
    })
  }
}

export default LoginService;
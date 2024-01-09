import { redirect } from 'react-router-dom'
import { myFetch } from '../functions/myFetch';
const URL = "/api/register";

class RegisterService {
  constructor(props) {
    this.setMessage = props.setMessage;
    this.registerAction = this.registerAction.bind(this);
  }

  // šalje post request na backend s podatcima za registraciju korisnika
  // služi za registraciju korisnika
  register(user) {
    return myFetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    }, false);
  }

  // funkcija koja se pokreće kada radimo post request na /register 
  // (to nije post reqest na backend nego post request na frontend)
  async registerAction({ request }) {
    const data = await request.formData();
    let user = {
      "email": data.get("email"),
      "username": data.get("username"),
      "password": data.get("password"),
      "name": data.get("name"),
      "surname": data.get("surname")
    }
    return this.register(user)
      .then((response) => {
        this.setMessage(response.message);
        if (response.message !== "User added") {
          return redirect("/register");
        } else {
          return redirect("/login");
        }
      }, () => { return redirect("/register") });
  }
}


export default RegisterService;
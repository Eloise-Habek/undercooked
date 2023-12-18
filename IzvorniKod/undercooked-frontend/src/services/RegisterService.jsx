import { redirect } from 'react-router-dom'
const URL = "/api/register";

class RegisterService {
  constructor(props) {
    this.setMessage = props.setMessage;
    this.registerAction = this.registerAction.bind(this);
  }

  // šalje post request na backend s podatcima za registraciju korisnika
  // služi za registraciju korisnika
  register(user) {
    return fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
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
        return response.json()
      })
      .then((response) => {
        this.setMessage(response.message);
        if (response.message !== "User added") {
          return redirect("/register");
        } else {
          return redirect("/login");
        }
      });
  }
}


export default RegisterService;
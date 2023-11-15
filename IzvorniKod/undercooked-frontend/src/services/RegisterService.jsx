const URL = "/api/register";

class RegisterService {
  // šalje post request na backend s podatcima za registraciju korisnika
  // služi za registraciju korisnika
  register(user) {
    return fetch(URL, {
      method: "POST",
      mode:"cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    });
  }
}

export default new RegisterService();
const server = "http://localhost:8080";
const URL = server + "/api/register";

class RegisterService {
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
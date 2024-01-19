import secureLocalStorage from "react-secure-storage";
import { myFetch } from "../functions/myFetch";
import { redirect } from "react-router-dom";

const URL = "/api/profile";

export default class ProfileService {
  constructor(props) {
    //this.setMessage = props.setMessage;
    this.editAction = this.editAction.bind(this);
  }
  // šalje get request na backend i vraća response sa servera u obliku js promise
  // služi za vraćanje podataka o profilu korisnika
  getProfile(username) {
    return myFetch(URL + "/" + username, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      },
    }, true)
  }
  get() {
    return myFetch(URL, {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      },
    }, true)
  }
  getAvailable(username) {
    return myFetch(URL + "/" + username + "/available", {
      method: "GET",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      },
    }, true)
  }
  delete() {
    return myFetch("/api/profile", {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken")
      }
    }, true)
  }
  async editAction({ request }) {
    const data = await request.formData();
    let userData = {
      "availability": {
        "monday": {
          "start": parseInt(data.get("monday_from_h")),
          "end": parseInt(data.get("monday_to_h"))
        },
        "tuesday": {
          "start": parseInt(data.get("tuesday_from_h")),
          "end": parseInt(data.get("tuesday_to_h"))
        },
        "wednesday": {
          "start": parseInt(data.get("wednesday_from_h")),
          "end": parseInt(data.get("wednesday_to_h"))
        },
        "thursday": {
          "start": parseInt(data.get("thursday_from_h")),
          "end": parseInt(data.get("thursday_to_h"))
        },
        "friday": {
          "start": parseInt(data.get("friday_from_h")),
          "end": parseInt(data.get("friday_to_h"))
        },
        "saturday": {
          "start": parseInt(data.get("saturday_from_h")),
          "end": parseInt(data.get("saturday_to_h"))
        },
        "sunday": {
          "start": parseInt(data.get("sunday_from_h")),
          "end": parseInt(data.get("sunday_to_h"))
        }
      }
    }
    if (data.get("email") !== "") {
      userData.email = data.get("email")
    }
    if (data.get("name") !== "") {
      userData.name = data.get("name")
    }
    if (data.get("surname") !== "") {
      userData.surname = data.get("surname")
    }

    return myFetch("/api/profile", {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Authorization": secureLocalStorage.getItem("logInToken"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }, true).then(() => redirect("/settings"), () => redirect("/"));
  }
}


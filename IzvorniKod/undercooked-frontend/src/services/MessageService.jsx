// import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { myFetch } from "../functions/myFetch";

const URL = "/api/message";

class MessageService {
    constructor(props) {
        //this.setMessage = props.setMessage;
        this.sendAction = this.sendAction.bind(this);
    }
    getMessages() {
        return myFetch(URL + "/getMessages", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true)
    }
    sendMessage(message) {
        console.log(message.receiver);
        return myFetch("/api/profile/" + message.receiver + "/available", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
        }, true).then((d) => {
            if (d.available) {
                return myFetch(URL, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": secureLocalStorage.getItem("logInToken")
                    },
                    body: JSON.stringify(message)
                }, true);
            } else {
                alert("User not available!");
                return Promise.reject("User not available!");
            }
        }, () => {
            return myFetch(URL, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": secureLocalStorage.getItem("logInToken")
                },
                body: JSON.stringify(message)
            }, true);
        })

    }
    notify(message) {
        return myFetch(URL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: JSON.stringify(message)
        }, true);
    }
    setRead(id) {
        return myFetch(URL + "/read/" + id.toString(), {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }
    getUnread() {
        return myFetch(URL + "/getUnread", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        }, true);
    }
    async sendAction({ request }) {
        const data = await request.formData();

        let mess = {
            "text": data.get("text"),
            "sender": secureLocalStorage.getItem("username"),
            "receiver": data.get("receiver")
        }
        return this.sendMessage(mess).then(() => { }, () => { }).then(() => null);
    }
}

export default MessageService;
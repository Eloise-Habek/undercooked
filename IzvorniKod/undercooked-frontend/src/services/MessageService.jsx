// import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const URL = "/api/message";

class MessageService {
    constructor(props) {
        //this.setMessage = props.setMessage;
        this.sendAction = this.sendAction.bind(this);
    }
    getMessages() {
        return fetch(URL + "/getMessages", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        })
    }
    sendMessage(message) {
        return fetch(URL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Authorization": secureLocalStorage.getItem("logInToken")
            },
            body: JSON.stringify(message)
        });
    }
    setRead(id) {
        return fetch(URL + "/read/" + id.toString(), {
            method: "POST",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        });
    }
    getUnread() {
        return fetch(URL + "/getUnread", {
            method: "GET",
            mode: "cors",
            headers: {
                "Authorization": secureLocalStorage.getItem("logInToken")
            }
        });
    }
    async sendAction({ request }) {
        const data = await request.formData();

        let mess = {
            "text": data.get("text"),
            "sender": secureLocalStorage.getItem("username"),
            "receiver": data.get("receiver")
        }
        this.sendMessage(mess).then(res => {
            if (!res.ok) {
                alert("something went wrong");
            }
        })
        return null;
    }
}

export default MessageService;
import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export function Logout() {
    secureLocalStorage.removeItem("logInToken")
    //window.location.reload(false);
    return <h1>Logged out</h1>
}
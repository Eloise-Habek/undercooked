import { redirect } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export function myFetch(apiUrl, reqDetails, needToken) {
    return fetch("/api/online", {
        method: "GET",
        mode: "cors"
    }).then(res1 => {
        if (res1.ok) {
            if (needToken) {
                if (secureLocalStorage.getItem("logInToken") !== null) {
                    return fetch("/api/loginValid", {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        "Authorization": secureLocalStorage.getItem("logInToken")
                    }
                }).then(res2 => {
                    if(!res2.ok) {
                        secureLocalStorage.removeItem("logInToken")
                        secureLocalStorage.removeItem("isAdmin")
                        alert("Login token expired")
                    } else {
                        return fetch(apiUrl, reqDetails)
                        .then(async res3 => {
                            if (res3.ok) {
                                return await res3.json()
                            }
                            return null;
                        })
                    }
                })
                }
                return null
            }
            return fetch(apiUrl, reqDetails)
                .then(async res3 => {
                    if (res3.ok) {
                        return await res3.json()
                    }
                    return null;
                })
        }
        return null;
    })
}
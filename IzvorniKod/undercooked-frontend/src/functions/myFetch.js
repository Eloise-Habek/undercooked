import secureLocalStorage from "react-secure-storage";

async function serverOnline() {
    const res = await fetch("/api/online", {
        method: "GET",
        mode: "cors"
    });
    if (res.ok) {
        return Promise.resolve("Ok");
    }
    return await Promise.reject("Server down!");
}

async function tokenValid() {
    const res = await fetch("/api/loginValid", {
        method: "GET",
        mode: "cors",
        headers: {
            "Authorization": secureLocalStorage.getItem("logInToken")
        }
    });
    if (res.ok) {
        return Promise.resolve("Ok");
    }
    secureLocalStorage.removeItem("logInToken");
    secureLocalStorage.removeItem("isAdmin");
    alert("Login token expired");
    return await Promise.reject("Token expired!");
}

export async function myFetch(apiUrl, reqDetails, needToken) {
    return serverOnline().then(async () => {
        if (needToken) {
            return tokenValid().then(async () => {
                return fetch(apiUrl, reqDetails).then(res => {
                    if (res.status < 400) {
                        return res.json();
                    }
                    return Promise.reject("Error");
                })
            }, () => { return Promise.reject("Token expired!") })
        }
        const res_1 = await fetch(apiUrl, reqDetails);
        if (res_1.status < 400) {
            return res_1.json();
        }
        return await Promise.reject("Error");
    }, () => {return Promise.reject("Server down!")})
}

// export async function myFetch(apiUrl, reqDetails, needToken) {
//     const res1 = await fetch("/api/online", {
//         method: "GET",
//         mode: "cors"
//     });
//     if (res1.ok) {
//         if (needToken) {
//             if (secureLocalStorage.getItem("logInToken") !== null) {
//                 return fetch("/api/loginValid", {
//                     method: "GET",
//                     mode: "cors",
//                     headers: {
//                         "Authorization": secureLocalStorage.getItem("logInToken")
//                     }
//                 }).then(res2 => {
//                     if (!res2.ok) {
//                         secureLocalStorage.removeItem("logInToken");
//                         secureLocalStorage.removeItem("isAdmin");
//                         alert("Login token expired");
//                     } else {
//                         return fetch(apiUrl, reqDetails)
//                             .then(async (res3) => {
//                                 if (res3.status < 400) {
//                                     return await res3.json();
//                                 }
//                                 return Promise.reject("Error");
//                             });
//                     }
//                 });
//             }
//             return Promise.reject("Error");
//         }
//         return fetch(apiUrl, reqDetails)
//             .then(async (res3_1) => {
//                 if (res3_1.status < 400) {
//                     return await res3_1.json();
//                 }
//                 return Promise.reject("Error");
//             });
//     }
//     return Promise.reject("Error");
// }
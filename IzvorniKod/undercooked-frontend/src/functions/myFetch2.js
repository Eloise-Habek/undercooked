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
    // alert("Login token expired");
    return await Promise.reject("Token expired!");
}

export async function myFetch2(apiUrl, reqDetails, needToken) {
    return serverOnline().then(async () => {
        if (needToken) {
            return tokenValid().then(async () => {
                return fetch(apiUrl, reqDetails).then(res => {
                    if (res.status < 400) {
                        return res;
                    }
                    return Promise.reject("Error");
                })
            }, () => { return Promise.reject("Token expired!") })
        }
        const res_1 = await fetch(apiUrl, reqDetails);
        if (res_1.status < 400) {
            return res_1;
        }
        return await Promise.reject("Error");
    }, () => {return Promise.reject("Server down!")})
}
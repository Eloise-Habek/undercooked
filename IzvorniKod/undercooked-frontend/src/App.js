import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  redirect,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Login, loginAction } from "./pages/Login";
import { Register, registerAction } from "./pages/Register";
//import Nav from "./pages/wrapper/Nav";
import { AdminPage, getById } from "./pages/AdminPage";
import {Header} from "./pages/wrapper/Header";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";



function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(secureLocalStorage.getItem("logInToken") === null ? false : true);
  const [isAdmin,setIsAdmin] = useState(secureLocalStorage.getItem("isAdmin") === null ? false : true);
  const [message,setMessage] = useState("");


  const loginActionWrapper = async ({ request }) => {
    loginAction({ request }).then((response) => {
      if (response === "login success") {
        setIsLoggedIn(true);
        if (secureLocalStorage.getItem("isAdmin") !== null) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
        setMessage("login success");
      } else {
        setIsLoggedIn(false);
        setMessage("login failed");
      }
    });
    return redirect("/");
  }

  const registerActionWrapper = async ({ request }) => {
    registerAction({request}).then((response) => {
      setMessage(response);
    });
    return redirect("/");
  }


  // stvaramo router koji za dani url učitava pripadajuću komponentu
  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header message={message} setMessage={setMessage}
      loggedIn={isLoggedIn} changeIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin}/>}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login changeIsLoggedIn={setIsLoggedIn}/>} action={loginActionWrapper} />
        <Route path="register" element={<Register />} action={registerActionWrapper} />
        <Route path="admin" element={<AdminPage />} action={getById} />
        <Route path="admin/:id" element={<AdminPage />} />
      </Route>
    )
  );
  return <RouterProvider router={appRouter}></RouterProvider>;
  
  
}

export default App;

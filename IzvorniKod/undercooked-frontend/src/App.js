import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
//import Nav from "./pages/wrapper/Nav";
import { AdminPage, getById } from "./pages/AdminPage";
import {Header} from "./pages/wrapper/Header";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import RegisterService from "./services/RegisterService";
import LoginService from "./services/LoginService";



function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(secureLocalStorage.getItem("logInToken") === null ? false : true);
  const [isAdmin,setIsAdmin] = useState(secureLocalStorage.getItem("isAdmin") === null ? false : true);
  const [message,setMessage] = useState("");

  let registerService = new RegisterService({ "setMessage": setMessage });
  let loginService = new LoginService({
    "setIsLoggedIn": setIsLoggedIn,
    "setIsAdmin": setIsAdmin,
    "setMessage": setMessage,    
  })



  // stvaramo router koji za dani url učitava pripadajuću komponentu
  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header message={message} setMessage={setMessage}
      loggedIn={isLoggedIn} changeIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin}/>}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} action={ loginService.loginAction } />
        <Route path="register" element={<Register />} action={registerService.registerAction} />
        <Route path="admin" element={<AdminPage />} action={getById} />
        <Route path="admin/:id" element={<AdminPage />} />
      </Route>
    )
  );
  return <RouterProvider router={appRouter}></RouterProvider>;
  
  
}

export default App;

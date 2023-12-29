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

import { Inbox } from "./pages/Inbox";
import MessageService from "./services/MessageService";

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(secureLocalStorage.getItem("logInToken") === null ? false : true);
  const [isAdmin,setIsAdmin] = useState(secureLocalStorage.getItem("isAdmin") === null ? false : true);
  const [message,setMessage] = useState("");
  const [hideMessage,setHideMessage] = useState(0);

  const messageHandler = (message) => {
    setHideMessage(0);
    setMessage(message);
  }

  let registerService = new RegisterService({ "setMessage": messageHandler });
  let loginService = new LoginService({
    "setIsLoggedIn": setIsLoggedIn,
    "setIsAdmin": setIsAdmin,
    "setMessage": messageHandler,    
  })

  let messageService = new MessageService();

  setTimeout(() => {
    setHideMessage(1);    
  }, 4000);

  // stvaramo router koji za dani url učitava pripadajuću komponentu
  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header message={message} setMessage={messageHandler}
      setHideMessage={setHideMessage}
      hide={hideMessage} loggedIn={isLoggedIn} changeIsLoggedIn={setIsLoggedIn} isAdmin={isAdmin}/>}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} action={ loginService.loginAction } />
        <Route path="register" element={<Register />} action={registerService.registerAction} />
        <Route path="admin" element={<AdminPage />} action={getById} />
        <Route path="admin/:id" element={<AdminPage />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="message" element={<Inbox />} action={messageService.sendAction}/>
      </Route>
    )
  );
  return <RouterProvider router={appRouter}></RouterProvider>;
  
  
}

export default App;

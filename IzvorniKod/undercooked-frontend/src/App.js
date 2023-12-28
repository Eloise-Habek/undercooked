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
// import { Inbox } from "./pages/Inbox";
// import { Search } from "./pages/Search";
//import Nav from "./pages/wrapper/Nav";
import { AdminPage } from "./pages/AdminPage";
import { Wrapper } from "./pages/wrapper/Wrapper";
import { Search } from "./pages/Search";
import { Inbox } from "./pages/Inbox";
import { Recipe } from "./pages/Recipe";
import { PostRecipePage } from "./pages/PostRecipePage";
import { Settings } from "./pages/Settings";
// import { useState } from "react";
// import secureLocalStorage from "react-secure-storage";
// import RegisterService from "./services/RegisterService";
// import LoginService from "./services/LoginService";



function App() {
  // const [isLoggedIn,setIsLoggedIn] = useState(secureLocalStorage.getItem("logInToken") === null ? false : true);
  // const [isAdmin,setIsAdmin] = useState(secureLocalStorage.getItem("isAdmin") === null ? false : true);
  // const [message,setMessage] = useState("");
  // const [hideMessage,setHideMessage] = useState(0);

  // const messageHandler = (message) => {
  //   setHideMessage(0);
  //   setMessage(message);
  // }

  // let registerService = new RegisterService({ "setMessage": messageHandler });
  // let loginService = new LoginService({
  //   "setIsLoggedIn": setIsLoggedIn,
  //   "setIsAdmin": setIsAdmin,
  //   "setMessage": messageHandler,    
  // })

  

  // setTimeout(() => {
  //   setHideMessage(1);    
  // }, 4000);

  // stvaramo router koji za dani url učitava pripadajuću komponentu
  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Wrapper />}>
        <Route index element={<Search />} />
        <Route path="feed" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="inbox" element={<Inbox />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="logout" element={<Home />} />
        <Route path="recipe" element={<Recipe />} />
        <Route path="editRecipe" element={<PostRecipePage />} />
        <Route path="editProfile" element={<Settings />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} action={ loginService.loginAction } />
        <Route path="register" element={<Register />} action={registerService.registerAction} />
        <Route path="admin" element={<AdminPage />} action={getById} />
        <Route path="admin/:id" element={<AdminPage />} />
        <Route path="search" element={<Search />} />
        <Route path="inbox" element={<Inbox />} /> */}
      </Route>
    )
  );
  return <RouterProvider router={appRouter}></RouterProvider>;
  
  
}

export default App;

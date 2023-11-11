import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Login, loginAction } from "./pages/Login";
import { Register, registerAction } from "./pages/Register";
import Nav from "./pages/wrapper/Nav";
import { Logout } from "./pages/Logout";
import { AdminPage, getById } from "./pages/AdminPage";
import { adminPostAction } from "./pages/AdminPostHandler";

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={Nav}>
      <Route index element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="register" element={<Register />} action={registerAction} />
      <Route path="logout" element={<Logout />} />
      <Route path="admin" element={<AdminPage />} action={getById} />
      <Route path="admin/:id" element={<AdminPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;

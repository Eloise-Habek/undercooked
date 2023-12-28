import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export function Wrapper() {
    return <>
        <Header />
        <Outlet />
    </>
}
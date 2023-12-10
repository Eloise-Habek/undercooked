import { NavLink } from "react-router-dom";
import { Links } from "./Links";
import { Outlet } from "react-router-dom";
// import { Footer } from "./Footer";
import "../../styles/nav.css"

export function Header({ loggedIn, changeIsLoggedIn, isAdmin }) {


    return (
        <>
            <header>
                <nav className='navbar'>
                    <hr />
                    <div className='right'>
                        <div><NavLink className="izbornik" to={"/"}>HOME</NavLink></div>
                        <div><NavLink className="izbornik" to={"/login"}>LOGIN</NavLink></div>
                        <div><NavLink className="izbornik" to={"/register"}>REGISTER</NavLink></div>
                    </div>
                    <hr />
                </nav>
            </header>
            <main>

                {loggedIn ? <Links changeIsLoggedIn={changeIsLoggedIn} isAdmin={isAdmin} /> : null}
                <Outlet />

            </main>
            <footer>
                <hr />
            </footer>
        </>
    );
}
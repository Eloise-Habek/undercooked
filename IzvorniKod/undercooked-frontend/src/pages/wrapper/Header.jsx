import { NavLink } from "react-router-dom";
import { Links } from "./Links";
import { Outlet } from "react-router-dom";
// import { Footer } from "./Footer";
import "../../styles/nav.css"
import { Message } from "./Message";

export function Header({ message, setMessage, loggedIn, changeIsLoggedIn, isAdmin, hide, setHideMessage }) {
    return (
        <>
            <header>
                <nav className='navbar'>
                    <hr />
                    <div className='right'>
                        <div><NavLink className="izbornik" to={"/search"}>SEARCH</NavLink></div>
                        <div><NavLink className="izbornik" to={"/inbox"}>INBOX</NavLink></div>
                        <div><NavLink className="izbornik" to={"/"}>HOME</NavLink></div>
                        <div><NavLink className="izbornik" to={"/login"}>LOGIN</NavLink></div>
                        <div><NavLink className="izbornik" to={"/register"}>REGISTER</NavLink></div>
                    </div>
                    <hr />
                </nav>
            </header>
            <main>
                <Message message={message} hide={hide} setHideMessage={setHideMessage} />
                {loggedIn ? <Links setMessage={setMessage} changeIsLoggedIn={changeIsLoggedIn} isAdmin={isAdmin} /> : null}
                <Outlet />

            </main>
            <footer>
                <hr />
            </footer>
        </>
    );
}
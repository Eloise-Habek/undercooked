import { NavLink } from "react-router-dom";
import { Links } from "./Links";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import "../../styles/nav.css"
import { Message } from "./Message";
import { useEffect, useState } from "react";
import MessageService from "../../services/MessageService";
import secureLocalStorage from "react-secure-storage";

export function Header({ message, setMessage, loggedIn, changeIsLoggedIn, isAdmin, hide, setHideMessage }) {
    let [unread, setUnread] = useState(0);

    useEffect(() => {
        if (secureLocalStorage.getItem("logInToken") !== null) {
            let messageService = new MessageService();
            messageService.getUnread().then(res => res.json()).then(res => setUnread(res));
        } else {
            setUnread(0);
        }

    }, [])
    return (
        <>
            <header>
                <nav className='navbar'>
                    <hr />
                    <div className='right'>
                        <div><NavLink className="izbornik" to={"/"}>HOME</NavLink></div>
                        <div><NavLink className="izbornik" to={"/login"}>LOGIN</NavLink></div>
                        <div><NavLink className="izbornik" to={"/register"}>REGISTER</NavLink></div>
                        <div><NavLink className="izbornik" to={"/inbox"}>{!unread ? "INBOX" : "INBOX " + unread}</NavLink></div>
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
                <Footer sticky={0} />
            </footer>
        </>
    );
}
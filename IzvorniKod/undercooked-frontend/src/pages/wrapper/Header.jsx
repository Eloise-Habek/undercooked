import { NavLink } from "react-router-dom";
import classes from "../../styles/header/header.module.css";
import { Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { Message } from "./Message";
import { useEffect, useMemo, useState } from "react";
import MessageService from "../../services/MessageService";

export function Header({ message, setMessage, loggedIn, changeIsLoggedIn, isAdmin, hide, setHideMessage }) {
    const [unread, setUnread] = useState(0);
    const [refresh, setRefresh] = useState(0);
    const [refTime, setRefTime] = useState(1000);
    const messageService = useMemo(() => new MessageService(), []);

    setInterval(() => {
        setRefresh(refresh + 1);
    }, 1000)

    useEffect(() => {
        const interval = setInterval(() => {
            messageService.getUnread().then(data => {
                if (data === null) {
                    setUnread(0)
                } else {
                    setUnread(data)
                }
            })
        }, 1000);

        return () => clearInterval(interval);

    }, [messageService])

    return (
        <>
            <header className={classes.two_headers_wrapper}>
                <div className={classes.header}>
                    <div className={classes.empty_div}></div>
                    <Message message={message} hide={hide} setHideMessage={setHideMessage} />
                    <div className={classes.webpage_title}>
                        <h3>Undercooked</h3>
                    </div>
                    <div className={classes.profile_btns_wrapper}>
                        {isAdmin && loggedIn ? <NavLink to={"/admin"} className={classes.top_buttons}>
                            {" admin "}
                        </NavLink> : null}

                        <NavLink to={loggedIn ? null : "/login"} className={classes.top_buttons}
                            onClick={() => {
                                if (loggedIn) {
                                    secureLocalStorage.removeItem("logInToken");
                                    changeIsLoggedIn(false);
                                    setMessage("Logged out!");
                                }
                            }}>
                            {loggedIn ? " logout " : " login "}
                        </NavLink>
                        {loggedIn ? <NavLink to={"/profile/" + secureLocalStorage.getItem("username")}
                            className={classes.chef_button}>
                            <div>{"@" + secureLocalStorage.getItem("username")}</div>
                            <img
                                src={require("../images/chef.png")}
                                alt="profile_icon"
                                className={classes.buttonImage}
                            />
                        </NavLink> : null}

                    </div>
                </div>
                <div className={classes.navigation}>
                    <div className={classes.nav_btn}>
                        <NavLink className="fa-solid fa-search" to={"/search"}></NavLink>
                    </div>
                    <div className={classes.nav_btn}>
                        <NavLink className="fa fa-home" to={"/feed"}></NavLink>
                    </div>
                    <div className={classes.nav_btn}>
                        <NavLink className="fa-solid fa-envelope" to={"/inbox"}></NavLink>
                        {unread === 0 ? null : <div>{unread}</div>}

                    </div>
                </div>
            </header>
            <div className={classes.placeholder}></div>
            <Outlet />
        </>
    );
}

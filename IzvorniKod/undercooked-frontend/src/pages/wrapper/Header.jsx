// import { NavLink } from "react-router-dom";
// import { Links } from "./Links";
// import { Outlet } from "react-router-dom";
// import { Footer } from "./Footer";
// import "../../styles/nav.css"
// import { Message } from "./Message";
// import { useEffect, useState } from "react";
// import MessageService from "../../services/MessageService";
// import secureLocalStorage from "react-secure-storage";

// export function Header({ message, setMessage, loggedIn, changeIsLoggedIn, isAdmin, hide, setHideMessage }) {
//     let [unread, setUnread] = useState(0);

//     useEffect(() => {
//         if (secureLocalStorage.getItem("logInToken") !== null) {
//             let messageService = new MessageService();
//             messageService.getUnread().then(res => res.json()).then(res => setUnread(res));
//         } else {
//             setUnread(0);
//         }

//     }, [])
//     return (
//         <>
//             <header>
//                 <nav className='navbar'>
//                     <hr />
//                     <div className='right'>
//                         <div><NavLink className="izbornik" to={"/"}>HOME</NavLink></div>
//                         <div><NavLink className="izbornik" to={"/login"}>LOGIN</NavLink></div>
//                         <div><NavLink className="izbornik" to={"/register"}>REGISTER</NavLink></div>
//                         <div><NavLink className="izbornik" to={"/inbox"}>{!unread ? "INBOX" : "INBOX " + unread}</NavLink></div>
//                     </div>
//                     <hr />
//                 </nav>
//             </header>
//             <main>
//                 <Message message={message} hide={hide} setHideMessage={setHideMessage} />
//                 {loggedIn ? <Links setMessage={setMessage} changeIsLoggedIn={changeIsLoggedIn} isAdmin={isAdmin} /> : null}
//                 <Outlet />

//             </main>
//             <footer>
//                 <Footer sticky={0} />
//             </footer>
//         </>
//     );
// }


import { NavLink } from "react-router-dom";
import classes from "../../styles/header/header.module.css";
import { Outlet } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { Message } from "./Message";

export function Header({ message, setMessage, loggedIn, changeIsLoggedIn, isAdmin, hide, setHideMessage }) {
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
                    </div>
                </div>
            </header>
            <div className={classes.placeholder}></div>
            <Outlet />
        </>
    );
}

import { NavLink } from "react-router-dom";
// import { Links } from "./Links";
// import { Outlet } from "react-router-dom";
// import { Footer } from "./Footer";
// import "../../styles/nav.css"
import classes from "../../styles/header/header.module.css";
// import { Message } from "./Message";

export function Header() {
  return (
    <>
      <header>
        <div className={classes.header}>
          <div className={classes.empty_div}></div>
          <div className={classes.webpage_title}>
            <h3>Undercooked</h3>
          </div>
          <div className={classes.profile_btns_wrapper}>
            <NavLink to={"/admin"} className={classes.top_buttons}>
              {" "}
              admin{" "}
            </NavLink>

            <NavLink to={"/logout"} className={classes.top_buttons}>
              {" "}
              logout{" "}
            </NavLink>
            <NavLink to={"/profile"} className={classes.chef_button}>
              <img
                src={require("../images/chef.png")}
                alt="profile_icon"
                className={classes.buttonImage}
              />
            </NavLink>
          </div>
        </div>
        <div className={classes.placeholder}></div>
        <div className={classes.navigation}>
          <div className={classes.nav_btn}>
            <NavLink className="fa fa-home" to={"/search"}></NavLink>
          </div>
          <div className={classes.nav_btn}>
            <NavLink className="fa fa-heart" to={"/feed"}></NavLink>
          </div>
          <div className={classes.nav_btn}>
            <NavLink className="fa fa-message" to={"/inbox"}></NavLink>
          </div>
        </div>
      </header>
      {/* <header>
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
            </footer> */}
    </>
  );
}

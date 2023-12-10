import { Outlet, NavLink } from 'react-router-dom'


import React, { Component } from 'react';
import { Links } from './Links'
import "../../styles/nav.css"
import { Footer } from './Footer';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "My Profile"
        }
        this.enableAccesToProfile = this.enableAccesToProfile.bind(this);
    }

    enableAccesToProfile(acc) {
        if (acc) {
            this.setState({ name: "My Profile" })
        } else {
            this.setState({ name: "" })
        }
    }

    render() {
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
                    <Links />
                    <Outlet />
                    <Footer />
                </main>
                <footer>
                    <hr />
                </footer>
            </>
        );
    }
}

export default Nav;
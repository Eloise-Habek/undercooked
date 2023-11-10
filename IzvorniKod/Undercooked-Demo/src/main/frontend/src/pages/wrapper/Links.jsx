import React, { Component } from 'react';
import { NavLink} from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage';

class Links extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: 0,
            admin: 0,
            pastProfile: 0,
            pastAdmin: 0,
            reload: 0
        }
    }
    componentDidMount() {
        if (secureLocalStorage.getItem("logInToken") != null) {
            this.setState({profile: 1}, () => {
                if (!this.state.reload) {
                    this.setState({reload: 1}, () => {
                        if (this.state.reload) {
                           // window.location.reload(false);
                        }
                        //
                    })
                   // 
                }
            })
        } else {
            this.setState({profile: 0})
        }
    }
    componentDidUpdate() {

    }
    
    render() {
        if (this.state.profile !== this.state.pastProfile) {
            this.setState({pastProfile: this.state.profile})
            //window.location.reload(false);
        }
        return (
            <>                
                {this.state.profile !== 0 && <div><NavLink to={"/profile"}>My Profile</NavLink></div>} 
                {this.state.admin !== 0 && <div><NavLink to={"/admin"}>Admin Page</NavLink></div>} 
            </>
        );
    }
}

export default Links;
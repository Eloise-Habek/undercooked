import React, { Component } from 'react';
import ProfileService from '../services/ProfileService';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: ""
        }
    }
    
    componentDidMount() {
        ProfileService.getProfile().then(res => {
            this.setState({email: res.data.email});
            this.setState({username: res.data.username});
        });
    }
    render() {
        return (
            <div>
                <h1>Email: {this.state.email}</h1>
                <h1>Username: {this.state.username}</h1>
            </div>
        );
    }
}

export default Profile;
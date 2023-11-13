import React, { useState, useEffect } from 'react';
import ProfileService from '../services/ProfileService';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';
import "../styles/profile.css"

export function Profile() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if(secureLocalStorage.getItem("logInToken") != null) {
            ProfileService.getProfile().then(res => res.json()).then(data => {
                setEmail(data.email);
                setUsername(data.username);
                setName(data.name);
                setSurname(data.surname);
            });

         } else {
            navigate("/login");
        }
            
    }, [navigate]);
    return (
        <div className='main_profile'>
        <div className='slika_profila'>
            <img src = {require("./images/default_profile_photo.png")} alt="" />
        </div>

        <div className='profile-card'>
            <div className='info'>
                <h2 className='one_info'>Username: {username}</h2>
                <h2 className='one_info'>Name: {name}</h2>
                <h2 className='one_info'>Surname: {surname}</h2>
                <p className='one_info'>Email: {email}</p>
            </div>
        </div>
    </div>
        );
}


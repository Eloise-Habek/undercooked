import React, { useState, useEffect } from 'react';
import ProfileService from '../services/ProfileService';
import secureLocalStorage from 'react-secure-storage';
import { useNavigate } from 'react-router-dom';

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
                // ovo je malo glitchy
                // alert("Sign in to see your profile!")
                // navigate("/")

                //ovo je bolja solucija
            navigate("/login");
        }
            
    });
    return (
            <div>
                <h1>Email: {email}</h1>
                <h1>Username: {username}</h1>
                <h1>Name: {name}</h1>
                <h1>Surname: {surname}</h1>
            </div>
        );
}


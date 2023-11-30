import React, {Component, useEffect, useState} from 'react';
import './userProfile.css'
import Header from "../Header/Header";
import Auth from "../../backend/Auth";
import {useNavigate, useParams} from "react-router-dom";
import {getUserProfile} from "../../backend/UserProfile";


export default function UserProfile() {

    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const userId= Auth.getUserId();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const handleLogoutAndNavigate = () => {
        setAuthenticated(Auth.logout());

        navigate('/');
    };

    useEffect(() => {
        const fetchUserProfile = () => {
            getUserProfile(userId)
                .then((data) => {
                    setUserData(data);
                    console.log(data.age);
                })
                .catch((error) => {
                    // Handle error if needed
                    console.error('Error fetching user profile:', error);
                });
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const tokenValid = Auth.isTokenValid();
            setAuthenticated(tokenValid);
            if (!tokenValid) {
                navigate("/auth")
            }
        }, 1000); // Check every second

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return(

        <>
            <img className="angle top center" src="/img/Star%201.png" alt="Angle" />
            <img className="angle right__home" src="/img/Ellipse 6.png" alt="Ellipse" />
            <Header />
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet" />
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet" />
            <div className="container main profile">
                <div className="display__flex">
                    <div className="profile__photo">
                        <img src="/img/Rectangle 176(2).png" alt="User" />
                        <button className="nav__img change__photo">Изменить фото</button>
                    </div>

                    <div className="profile__ifo">
                        <div className="edit__info">
                            <div className="main__title profile">
                                {userData.name} {userData.surname}
                                {userData.email}
                            </div>
                            <div className="margin__top">
                                <button className="nav__img profile">
                                    <img src="/img/Small FAB.png" alt="FAB" />
                                </button>
                            </div>
                        </div>
                        <div className="worker">студент</div>
                        <div className="profile__edit">
                            <div className="profile__edit__info">
                                <div className="profile__edit__title">Возраст</div>
                                <input className="profile__edit__input age" type="text" value={userData.age} placeholder="Возраст" />
                            </div>
                            <div className="profile__edit__info nickname">
                                <div className="profile__edit__title">Никнейм</div>
                                <input className="profile__edit__input nickname" type="text" value={userData.username} placeholder="Юзернейм" />
                            </div>
                        </div>
                        <div className="profile__edit">
                            <div className="profile__edit__info email">
                                <div className="profile__edit__title">Email</div>
                                <input className="profile__edit__input email" type="email" value={userData.email} placeholder="Емэил" />
                            </div>
                            <div className="profile__edit__info age">
                                <div className="profile__edit__title">Количество постов</div>
                                <input className="profile__edit__input age" type="text" value={userData.totalPosts} placeholder="---" />
                            </div>
                        </div>
                        <div className="profile__edit__info textarea">
                            <div className="profile__edit__title">Обо мне</div>
                            <div className="problems__input profile">
                                <textarea className="profile__edit__title" value={userData.bio} />
                            </div>
                        </div>
                        <button onClick={handleLogoutAndNavigate} className="nav__img profile">
                            <div className="display__flex">
                                <div className="log__out">Выйти из аккаунта</div>
                                <div>
                                    <img src="/img/Group 89.png" alt="Group 89" />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

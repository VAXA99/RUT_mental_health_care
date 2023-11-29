import React, {Component, useEffect, useState} from 'react';
import './userProfile.css'
import Header from "../Header/Header";
import Auth from "../../backend/Auth";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


export default function UserProfile() {
    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);

    const { userId } = useParams();

    const [userData, setUserData] = useState({});

    useEffect(() => {
        // Получение профиля пользователя
        axios.get(`http://localhost:8080/api/profile/${userId}`)
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    }, [userId]);

    const navigate = useNavigate();
    const handleLogoutAndNavigate = () => {
        setAuthenticated(Auth.logout());

        navigate('/');
    };

    return(

        <>
            <img className="angle top center" src="/img/Star%201.png"/>
            <img className="angle right__home" src="/img/Ellipse 6.png"/>
            <Header/>
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                  rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
            <div className='container main profile'>
                <div className="display__flex">
                    <div className="profile__photo">
                        <img src="/img/Rectangle 176(2).png" alt=""/>
                        <button className='nav__img change__photo'>Изменить фото</button>
                    </div>

                    <div className="profile__ifo">
                        <div className="edit__info">
                            <div className="main__title profile">
                                Шедания Вахтанг Мерабиевич
                                {userData.email}
                            </div>
                            <div className='margin__top'>
                                <button  className="nav__img profile"><img src="/img/Small FAB.png" alt=""/></button>
                            </div>
                        </div>
                        <div className="worker">
                            студент
                        </div>
                        <div className="profile__edit">
                            <div className="profile__edit__info">
                                <div className="profile__edit__title">
                                    Возраст
                                </div>
                                <input  className='profile__edit__input age' type="text" placeholder='19 лет'/>
                            </div>
                            <div className="profile__edit__info nickname">
                                <div className="profile__edit__title ">
                                    Никнейм
                                </div>
                                <input  className='profile__edit__input nickname' type="text" placeholder='Vaxo009'/>
                            </div>
                        </div>
                        <div className="profile__edit">
                            <div className="profile__edit__info email">
                                <div className="profile__edit__title">
                                    Email
                                </div>
                                <input  className='profile__edit__input email ' type="emal" placeholder='somemail@gmail.com'/>
                            </div>
                            <div className="profile__edit__info age">
                                <div className="profile__edit__title">
                                    Записей в thread
                                </div>
                                <input  className='profile__edit__input age' type="text" placeholder='120'/>
                            </div>
                        </div>
                        <div className="profile__edit__info textarea">
                            <div className="profile__edit__title">
                                Обо мне
                            </div>
                            <div className="problems__input profile">
                                <textarea className="profile__edit__title ">Не пью не курю</textarea>
                            </div>
                        </div>
                        <button onClick={handleLogoutAndNavigate} className='nav__img profile'>
                            <div className="display__flex">
                                <div className='log__out'>
                                    Выйти из аккаунта
                                </div>
                                <div>
                                    <img src="/img/Group 89.png" alt=""/>
                                </div>
                            </div>
                        </button>
                    </div>

                    </div>
            </div>

        </>
    )
}

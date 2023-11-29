import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Auth from '../../backend/Auth'
import Popup from "../Popup/Popup";

export default function Header() {

    const [modalState, setModalVisible] = useState(false);
    const openModal = () => {
        setModalVisible(true);
    };

    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const [showPopup, setShowPopup] = useState(false); // State for showing/hiding the popup

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleLogout = async () => {
        await Auth.logout();
        setAuthenticated(false);
    };

    const navigate = useNavigate();
    const handleLogoutAndNavigate = () => {
        setAuthenticated(Auth.logout());

        navigate('/');
    };

    const userId = Auth.isUserIdValid();


    useEffect(() => {
        const intervalId = setInterval(() => {
            setAuthenticated(Auth.isTokenValid());
        }, 1000); // Check every second

        return () => {
            clearInterval(intervalId);
        };
    }, []); // Run this effect once during component mount


    return (
        <div>
            <div className="container head">

                <div className="header">

                    <div className="header__logo"><img src="/img/Логотип%20РУТ%20(МИИТ)%20синий%201.png" alt=""/></div>
                    <div className="header__title">Цифровая система психологической поддержки РУТ</div>
                    <div className="header__nav">
                        { authenticated ?
                            ( //TODO make links usable
                                //TODO make popUp usable
                                <div>
                                    <button id="popup_link" className="nav__img focus" onClick={togglePopup}>
                                        <img className="header__nav__img focus" src="/img/иконка_уведомление.png" alt=""/>
                                    </button>
                                    <Link to={'/user_profile'}><img className="header__nav__img" src="/img/меню__.png" alt=""/></Link>
                                    <button className="nav__img" onClick={handleLogout}>
                                    <Link to={`/user_profile/${userId}`}><img className="header__nav__img" src="/img/меню__.png" alt=""/></Link>
                                    <button className="nav__img" onClick={handleLogoutAndNavigate}>
                                        <img className="header__nav__img" src="/img/Group%2089.png" alt=""/>
                                    </button>
                                    {showPopup && <Popup/>}
                                </div>
                            ) : (
                                <div>
                                    <Link className="header__nav__text" to={'/auth'}><img alt=""/>Войти</Link>
                                </div>
                           )
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

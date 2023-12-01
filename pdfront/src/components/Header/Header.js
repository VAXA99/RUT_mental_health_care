import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Auth from '../../backend/Auth'
import Popup from "../Popup/Popup";
import {getUserProfilePhoto} from "../../backend/UserProfile";

export default function Header() {

    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const [showPopup, setShowPopup] = useState(false); // State for showing/hiding the popup
    const username = Auth.getUsername();
    const navigate = useNavigate();
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const userId= Auth.getUserId();


    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleLogoutAndNavigate = () => {
        setAuthenticated(Auth.logout());

        navigate('/');
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setAuthenticated(Auth.isTokenValid());
        }, 1000); // Check every second

        return () => {
            clearInterval(intervalId);
        };
    }, []); // Run this effect once during component mount

    useEffect(() => {
        const fetchUserProfilePhoto = async () => {
            try {
                const imgElement = await getUserProfilePhoto(userId);
                setUserProfilePicture(imgElement);
            } catch (error) {
                console.error('Error fetching user profile photo:', error);
            }
        };

        fetchUserProfilePhoto();
    }, [userId]);


    return (
        <div>
            <div className="container head">
                <div className="header">

                    <Link to={'/'}><div className="header__logo"><img src="/img/Логотип%20РУТ%20(МИИТ)%20синий%201.png" alt=""/></div></Link>
                    <div className="header__title">Цифровая система психологической поддержки РУТ</div>
                    <div className="header__nav">
                        {authenticated ?
                            ( //TODO make links usable
                                //TODO make popUp usable
                                <div className='display__flex align__items'>
                                    <button id="popup_link" className="nav__img focus" onClick={togglePopup}>
                                        <img className="header__nav__img focus" src="/img/иконка_уведомление.png"
                                             alt=""/>
                                    </button>
                                    <div className='img__container'><Link to={`/user_profile/${username}`}>
                                        {userProfilePicture && <img className="header__nav__img profile" height="100%" width="100%" src={userProfilePicture.src} alt=""/>}
                                    </Link></div>
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

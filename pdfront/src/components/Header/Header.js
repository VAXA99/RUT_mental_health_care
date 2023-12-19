import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Auth from '../../backend/Auth';
import Popup from '../Popup/Popup';
import {getUserProfilePhoto} from '../../backend/UserProfile';
import auth from "../../backend/Auth";
import {useHeaderContext} from "../../UserProvider";

export default function Header() {
    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const [showPopup, setShowPopup] = useState(false);
    const username = Auth.getUsernameFromToken();
    const navigate = useNavigate();
    const { headerUserProfilePicture, setHeaderUserProfilePicture, userProfilePictureUpdated } = useHeaderContext();


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
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const scrollingUserUsername = auth.getUsernameFromToken(); // Replace with your method

    useEffect(() => {
        // Fetch user profile photo only when authenticated
        const fetchUserProfilePhoto = async () => {
            try {
                // Fetch user profile photo for the header
                const imgElement = await getUserProfilePhoto(scrollingUserUsername);
                setHeaderUserProfilePicture(imgElement);
            } catch (error) {
                console.error('Error fetching user profile photo for header:', error);
            }
        };

        if (authenticated) {
            // If userProfilePicture is not available, fetch it
            if (!headerUserProfilePicture) {
                fetchUserProfilePhoto();
            }
        }
    }, [authenticated, headerUserProfilePicture, scrollingUserUsername, setHeaderUserProfilePicture]);

    //todo figure out how to make header not to disappear when you are navigated back to main page from /auth and /signup

    return (
        <div>
            <div className="container head">
                <div className="header">
                    <Link to={'/'}>
                        <div className="header__logo">
                            <img src="/img/Логотип%20РУТ%20(МИИТ)%20синий%201.png" alt=""/>
                        </div>
                    </Link>
                    <div className="header__title">Цифровая система психологической поддержки РУТ</div>
                    <div className="header__nav">
                        {authenticated ? (
                            <div className="display__flex align__items">
                                {/*<button*/}
                                {/*    type="button"*/}
                                {/*    id="popup_link"*/}
                                {/*    className="nav__img focus"*/}
                                {/*    onClick={togglePopup}*/}
                                {/*>*/}
                                {/*    <img*/}
                                {/*        className="header__nav__img focus"*/}
                                {/*        src="/img/иконка_уведомление.png"*/}
                                {/*        alt=""*/}
                                {/*    />*/}
                                {/*</button>*/}
                                <div className="img__container">
                                    <Link to={`/user_profile/${username}`}>
                                        {headerUserProfilePicture && (
                                            <img
                                                className="header__nav__img profile"
                                                height="100%"
                                                width="100%"
                                                src={headerUserProfilePicture.src}
                                                alt=""
                                            />
                                        )}
                                    </Link>
                                </div>
                                <button
                                    type="button"
                                    className="nav__img"
                                    onClick={handleLogoutAndNavigate}
                                >
                                    <img
                                        className="header__nav__img"
                                        src="/img/Group%2089.png"
                                        alt=""
                                    />
                                </button>
                                {showPopup && <Popup/>}
                            </div>
                        ) : (
                            <div>
                                <Link className="header__nav__text" to={'/auth'}>
                                    <img alt=""/>Войти
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import isTokenValid from '../../backend/Auth'

export default function Header() {

    const [authenticated, setAuthenticated] = useState(isTokenValid());

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Set the authenticated state to false
        setAuthenticated(false);
    };

    useEffect(() => {
        // Periodically check token validity and update the state
        const intervalId = setInterval(() => {
            setAuthenticated(isTokenValid());
            console.log("the token was checked");
        }, 60000); // Check every 60 seconds

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Run this effect once during component mount


    return (
        <div>
            <div className="container head">

                <div className="header">

                    <div className="header__logo"><img src="/img/Логотип%20РУТ%20(МИИТ)%20синий%201.png" alt=""/></div>
                    <div className="header__title">Цифровая система психологической поддержки РУТ</div>
                    <div className="header__nav">
                        {authenticated ?
                            ( //TODO make links usable
                                <div>
                                    <Link to={'/user_profile'}><img className="header__nav__img" src="/img/меню__.png"
                                                                    alt=""/></Link>
                                    <button onClick={handleLogout}>
                                        <img className="header__nav__img" src="/img/Group%2089.png" alt=""/>
                                    </button>
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

import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Auth from '../../backend/Auth'

export default function Header() {

    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);

    const handleLogout = () => {
        setAuthenticated(Auth.logout());
    };

    useEffect(() => {
        // Periodically check token validity and update the state
        const intervalId = setInterval(() => {
            setAuthenticated(Auth.isTokenValid);
        }, 100); // Check every 1/100 seconds

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
                        { authenticated ?
                            ( //TODO make links usable
                                <div>
                                    <button id="popup_link" className="nav__img focus">
                                        <img className="header__nav__img focus" src="/img/иконка_уведомление.png" alt=""/>
                                    </button>
                                    <Link to={'/user_profile'}><img className="header__nav__img" src="/img/меню__.png" alt=""/></Link>
                                    <button className="nav__img" onClick={handleLogout}>
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

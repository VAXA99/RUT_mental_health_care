import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './menu.css';
import Auth from "../../backend/Auth";

export default function Menu() {
    const location = useLocation();
    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setAuthenticated(Auth.isTokenValid());
        }, 1000); // Check every second

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div className="form">
            <div className="form__title">Меню</div>

                <div className="form__main">
                    {location.pathname !== '/spec' && <Link to={'/spec'}>
                        <div className="form info">Сотрудники</div>
                    </Link>}
                    {authenticated && location.pathname !== '/consultation_appointment' && <Link to={'/consultation_appointment'}>
                        <div className="form info">Как записаться</div>
                    </Link>}
                    {/*{location.pathname !== '/articles' && <Link to={'/articles'}>*/}
                    {/*    <div className="form info">Самопомощь</div>*/}
                    {/*</Link>}*/}
                    {location.pathname !== '/articles' && <Link to={'/articles'}>
                        <div className="form info">Библиотека</div>
                    </Link>}
                    {authenticated && location.pathname !== '/feed' && <Link to={'/feed'}>
                        <div className="form info">Тред</div>
                    </Link>}
                    {location.pathname !== '/' && <Link to={'/'}>
                        <div className="form info">Главная</div>
                    </Link>}
                </div>
        </div>
    );
}

import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
import './menu.css';
import Auth from "../../backend/Auth";
import auth from "../../backend/Auth";

export default function Menu() {
    const location = useLocation();
    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const userRole = auth.getUserRole();

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
                    {location.pathname !== '/articles' && <Link to={'/articles'}>
                        <div className="form info">Библиотека</div>
                    </Link>}
                    {authenticated && location.pathname !== '/feed' && <Link to={'/feed'}>
                        <div className="form info">Тред</div>
                    </Link>}
                    {location.pathname !== '/' && <Link to={'/'}>
                        <div className="form info">Главная</div>
                    </Link>}
                    {location.pathname !== '/psycho_schedule' && userRole === "ROLE_PSYCHOLOGIST" && <Link to={'/psycho_schedule'}>
                        <div className="form info">Расписание</div>
                    </Link>}
                </div>
        </div>
    );
}

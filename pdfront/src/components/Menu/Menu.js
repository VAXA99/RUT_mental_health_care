import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import './menu.css';

export default function Menu() {
    const location = useLocation();

    return (
        <div className="form">
            <div className="form__title">Меню</div>

                <div className="form__main">
                    {location.pathname !== '/spec' && <Link to={'/spec'}>
                        <div className="form info">Сотрудники</div>
                    </Link>}
                    {location.pathname !== '/consultation_appointment' && <Link to={'/consultation_appointment'}>
                        <div className="form info">Как записаться</div>
                    </Link>}
                    {location.pathname !== '/articles' && <Link to={'/articles'}>
                        <div className="form info">Самопомощь</div>
                    </Link>}
                    {location.pathname !== '/articles' && <Link to={'/articles'}>
                        <div className="form info">Библиотека</div>
                    </Link>}
                    {location.pathname !== '/forum' && <Link to={'/forum'}>
                        <div className="form info">Тред</div>
                    </Link>}
                    {location.pathname !== '/' && <Link to={'/'}>
                        <div className="form info">Главная</div>
                    </Link>}
                </div>
        </div>
    );
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './menu.css';

export default function Menu() {
  const location = useLocation();

  return (
    <div className="form">
      <div className="form__title">Меню</div>
      {location.pathname === '/' ? (
        <div className="form__main">
          
          <Link to={'/spec'}><div className="form info">Сотрудники</div></Link>          
          <Link to={'/'}><div className="form info">Как записаться</div></Link>
          <Link to={'/a'}><div className="form info">Самопомощь</div></Link>
          <Link to={'/articles'}><div className="form info">Библиотека</div></Link>
          <Link to={'/forum'}><div className="form info">Тред</div></Link>
        </div>


        ) : (
        <div className="form__main">
         {location.pathname !== '/spec' && <Link to={'/spec'}><div className="form info">Сотрудники</div></Link>}
          <Link to={'/a'}><div className="form info">Как записаться</div></Link>
          <Link to={'/a'}><div className="form info">Самопомощь</div></Link>
          <Link to={'/a'}><div className="form info">Библиотека</div></Link>
          {location.pathname !== '/forum' && <Link to={'/forum'}><div className="form info">Тред</div></Link>}
          <Link to={'/'}><div className="form info">Главная</div></Link>
        </div>
      )}
    </div>
  );
}

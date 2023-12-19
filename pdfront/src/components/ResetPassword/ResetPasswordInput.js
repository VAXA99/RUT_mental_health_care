import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export const ResetPasswordInput = () => {

    return (
        <div className='body'>
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/forma-djr-banner" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet"></link>
            <img className="angle top left" src="/img/Star%200.png" alt=""/>
            <img className="angle top right" src="/img/Ellipse%205.png" alt="1"/>
            <img className="angle bottom right" src="/img/Star%200.png" alt=""/>
            <img className="angle bottom left" src="/img/Ellipse%205.png" alt="1"/>
            <div className="container auth">
                <Link to={"/"} >
                    <div className="auth__img"><img src="/img/Логотип%20РУТ%20(МИИТ)%20синий%201.png" alt=""/></div>
                    <div className="auth__title">Цифровая система психологической поддержки РУТ</div>
                </Link>
                <form className="auth__form" /*onSubmit={handleLogin}*/>
                    <div className="form__block__title" >Введите новый пароль</div>
                    <div className="input__block">
                        <input className="auth__input"
                               placeholder="Введите новый пароль"
                               type="email" /*value={username}*/
                            /*onChange={(e) => setUsername(e.target.value)}*//>
                    </div>
                </form>
                <div className="form__buttons">
                    <button type="submit" className="auth__button">
                        Отправить письмо
                    </button>
                    <div className="auth__link">
                        <Link to={'/auth'} >
                            Назад
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
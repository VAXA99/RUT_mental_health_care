import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function Sign_up() {
    return (
        <div className='body'>
        <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
        <link href="https://fonts.cdnfonts.com/css/forma-djr-banner" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet"></link>
            <img className="angle top left" src="/img/Star 0.png" alt="" />
            <img className="angle top right" src="/img/Ellipse 5.png" alt="1" />
            <img className="angle bottom right" src="/img/Star 0.png" alt="" />
            <img className="angle bottom left" src="/img/Ellipse 5.png" alt="1"/>
            <div className="container auth">
                <div className="auth__img"><img src="/img/Логотип РУТ (МИИТ) синий 1.png" alt=""/></div>
                <div className="auth__title">Цифровая система психологической поддержки РУТ</div>
                <form className="auth__form">
                    <div className="input__block">
                        <input className="auth__input" placeholder="никнейм" type="email"/>
                        <input className="auth__input" placeholder="логин" type="password"/>
                        <input className="auth__input" placeholder="пароль" type="email"/>
                        <input className="auth__input" placeholder="имя" type="password"/>
                        <input className="auth__input" placeholder="фамилия" type="password"/>
                    </div>
                </form>
                <div className="form__buttons">
                    <button className="auth__button">Регистрация</button>
                    <div><Link className="auth__link" to={'/auth'}>Вход</Link>  </div>
                </div>
            </div>
        </div>
    )
}
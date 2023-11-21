import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
      <div>
        <div className="container head">
    
        <div className="header">
        
        <div className="header__logo"><img src="/img/Логотип%20РУТ%20(МИИТ)%20синий%201.png" alt=""/></div>
        <div className="header__title">Цифровая система психологической поддержки РУТ</div>
        <div className="header__nav">
            <Link href="/registration.html" to={'/auth'}><img className="header__nav__img" src="/img/меню__.png" alt=""/></Link>
            <a href="/registration.html"><img className="header__nav__img" src="/img/Group%2089.png" alt=""/></a>
        </div>
        </div>
      </div>
      </div>
    )
  
}

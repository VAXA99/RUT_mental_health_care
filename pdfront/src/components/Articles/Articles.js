import React, {useEffect} from 'react'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'
import './articles.css'
import Menu from "../Menu/Menu";
import RightForm from "../Right form/RightForm";

export default function Articles() {
    return (
        <>
            <Header/>
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/forma-djr-banner" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                  rel="stylesheet"></link>
            <img className="angle top center" src="/img/Star%201.png"/>
            <img className="angle right__home" src="/img/Ellipse 6.png"/>


            <div className="display__flex__mt">
                <div className="container left">
                   <Menu/>

                </div>
                <div className="container main">
                    <div className="articles__form">Статьи</div>
                    <div className="form main article">
                        <div className="img__position"><img src="/img/Rectangle 183.png" alt="" width="100%"
                                                            height="100%"/></div>
                        <div className="form__page__title">Как не потерять себя</div>
                    </div>
                    <div className="form main article">
                        <div className="img__position"><img src="/img/Rectangle 183 (1).png" alt="" width="100%"
                                                            height="100%"/></div>
                        <div className="form__page__title">Я увилился, что делать?</div>
                    </div>
                </div>
                <div className="container right">
                    <RightForm/>
                </div>
            </div>
        </>
    )
}
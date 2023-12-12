import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import Menu from '../Menu/Menu';
import RightForm from '../Right form/RightForm';
import TestingForm from '../TestingForm/TestingForm';
import Auth from "../../backend/Auth";


export default function Home() {
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
        <>
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/forma-djr-banner" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                  rel="stylesheet"></link>
            <img className="angle top center" src="/img/Star%201.png"/>
            <img className="angle right__home" src="/img/Ellipse 6.png"/>


            <div className="display__flex__mt overflow">
                <div className="container left">
                    <Menu/>
                    <TestingForm/>

                </div>
                <div className="container main main__page">
                    {authenticated ? (
                        <div className="form main">
                            <div className="form__block">
                                <div className="form__block__title">Запишитесь на прием</div>
                                <div className="form__block__info">Нужно только выбрать специалиста и время</div>
                            </div>
                            <div className="form__block__link">
                                <Link to={'/consultation_appointment'}>Записаться</Link>
                            </div>
                        </div>
                    ) : (
                        <div></div>
                    )
                    }
                    <div className="main__links">
                        <div className="links top">
                            <div className="links__components">
                                <Link to={''}>
                                    <img className="main__links__comp" src="/img/Студентам.png" alt="" width="105%"
                                         height="105%"/>
                                    <div className="links__subcomp">
                                        <div className="links__comp__text">Студентам <br/>и аспирантам</div>
                                        <img src="/img/Arrow%202.png" alt=""/>
                                    </div>
                                </Link>
                            </div>
                            <div className="links__components">
                                <Link to={''}>
                                    <img className="main__links__comp " src="/img/сотрудникам.png" alt="" width="105%"
                                         height="110%"/>
                                    <div className="links__subcomp empl">
                                        <div className="links__comp__text">Сотрудникам <br/>и преподавателям</div>
                                        <img src="/img/Arrow%202.png" alt=""/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="links bottom">
                            <div className="links__components">
                                <Link>
                                    <img className="main__links__comp" src="/img/новости.png" alt="" width="105%"
                                         height="105%"/>
                                    <div className="links__subcomp news">
                                        <div className="links__comp__text">Новости</div>
                                        <img src="/img/Arrow%202.png" alt=""/>
                                    </div>
                                </Link>
                            </div>
                            <div className="links__components">
                                <Link>
                                    <img className="main__links__comp" src="/img/инфо.png" alt="" width="105%"
                                         height="105%"/>
                                    <div className="links__subcomp">
                                        <div className="links__comp__text">Правила <br/>и регламентации</div>
                                        <img src="/img/Arrow%202.png" alt=""/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container right">
                    <RightForm/>
                </div>
            </div>
        </>
    )
}
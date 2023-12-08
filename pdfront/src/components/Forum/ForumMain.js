import Menu from "../Menu/Menu";
import Header from "../Header/Header";
import './forum.css'
import {Link} from "react-router-dom";
import React from "react";

export function ForumMain() {
    return (
        <>
            <Header/>
            <div className="display__flex__mt">
                <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                      rel="stylesheet"/>
                <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
                <img className="angle top center" src="/img/Star%201.png"/>
                <img className="angle right__home" src="/img/Ellipse 6.png"/>
                <div className="container left">
                    <Menu/>
                    <div className="form left">
                        <div className="form__title">Популярное</div>
                        <div className="form__main">
                            <div className="popular"><a href="/login.htm"># что то</a></div>
                            <div className="popular"><a href="/login.htm"># Как то</a></div>
                            <div className="popular"><a href="/login.htm"># Помощь</a></div>
                            <div className="popular"><a href="/login.htm"># Депрессия</a></div>
                            <div className="popular"><a href="/login.htm"># Заполнитель</a></div>
                        </div>
                    </div>
                </div>
                <div className="container main">
                    <div className="form main">
                        <div className="display__flex thread__flex">
                            <div className="form__theme">threads</div>
                            <div className="form__block__link thread">
                                <Link to={'/new_forum'}>Создать тред</Link>
                            </div>
                        </div>

                    </div>
                    <div className="form main">
                        <div className="theme__container main__page">
                            <div className="display__flex">
                                <div className="theme__img"><img src="/img/меню__.png" width="100%" height="100%"
                                                                 alt=""/></div>
                                <div className="form__theme">VAXO009</div>
                            </div>
                            <div className="theme__title">Моя борьба с депрессией: Надежда и выход</div>
                            <div className="theme__info main__page">
                                Я хочу поделиться с вами своим личным опытом, в надежде, что моя история сможет помочь
                                тем, кто сейчас чувствует себя уязвимым и одиноким из-за депрессии.
                                Несколько лет назад, я оказался в самой темной точке своей жизни. Депрессия охватила
                                меня как чёрная тень, и я чувствовал, что потерял смысл и радость во всём, что ранее мне
                                доставляло удовольствие. Мои дни казались бесконечной борьбой, и мне казалось, что никто
                                не понимает, что я переживаю.
                                Я часто чувствовал, что моя депрессия была как пустота, которая поглощала меня. Однако,
                                в этот момент, когда я был на грани, я нашел поддержку в самых неожиданных местах. Мои
                                близкие и друзья поддерживали меня, даже если они не всегда понимали, что я прохожу. И я
                                нашел профессиональную помощь, обратившись к психологу.
                                <br/>Самое важное, что я хочу сказать, это то, что депрессия - это не конец. Хотя дорога
                                к выздоровлению была долгой и сложной, она была того стоила. Сейчас я чувствую себя
                                сильнее, чем когда-либо, и я хочу сказать тем, кто сейчас борется, что есть надежда. Не
                                стесняйтесь просить помощи, делиться своими чувствами, и помните, что вы не одни.
                                С депрессией можно бороться, и я верю, что каждый из нас может найти свой собственный
                                путь к светлому будущему. Пожалуйста, помните, что вы ценны, и ваша история имеет
                                значение.
                            </div>
                            <div className="action__button">
                                <button className="action__button__element"><img
                                    src='/img/icons8-заполненная-тема-96 1.png' width="110%" height="110%"/></button>
                                <button className="action__button__element"><img src='/img/Vector.png' width="90%"
                                                                                 height="90%"/></button>
                                <div className="like__count">666</div>
                            </div>
                        </div>
                    </div>
                    <div className="form main">
                        <div className="theme__container main__page">
                            <div className="display__flex">
                                <div className="theme__img"><img src="/img/меню__.png" width="100%" height="100%"
                                                                 alt=""/></div>
                                <div className="form__theme">VAXO009</div>
                            </div>
                            <div className="theme__title">Моя борьба с депрессией: Надежда и выход</div>
                            <div className="theme__info main__page">
                                Я хочу поделиться с вами своим личным опытом, в надежде, что моя история сможет помочь
                                тем, кто сейчас чувствует себя уязвимым и одиноким из-за депрессии.
                                Несколько лет назад, я оказался в самой темной точке своей жизни. Депрессия охватила
                                меня как чёрная тень, и я чувствовал, что потерял смысл и радость во всём, что ранее мне
                                доставляло удовольствие. Мои дни казались бесконечной борьбой, и мне казалось, что никто
                                не понимает, что я переживаю.
                                Я часто чувствовал, что моя депрессия была как пустота, которая поглощала меня. Однако,
                                в этот момент, когда я был на грани, я нашел поддержку в самых неожиданных местах. Мои
                                близкие и друзья поддерживали меня, даже если они не всегда понимали, что я прохожу. И я
                                нашел профессиональную помощь, обратившись к психологу.
                                <br/>Самое важное, что я хочу сказать, это то, что депрессия - это не конец. Хотя дорога
                                к выздоровлению была долгой и сложной, она была того стоила. Сейчас я чувствую себя
                                сильнее, чем когда-либо, и я хочу сказать тем, кто сейчас борется, что есть надежда. Не
                                стесняйтесь просить помощи, делиться своими чувствами, и помните, что вы не одни.
                                С депрессией можно бороться, и я верю, что каждый из нас может найти свой собственный
                                путь к светлому будущему. Пожалуйста, помните, что вы ценны, и ваша история имеет
                                значение.
                            </div>
                            <div className="action__button">
                                <button className="action__button__element"><img
                                    src='/img/icons8-заполненная-тема-96 1.png' width="110%" height="110%"/></button>
                                <button className="action__button__element"><img src='/img/Vector.png' width="90%"
                                                                                 height="90%"/></button>
                                <div className="like__count">666</div>
                            </div>
                        </div>
                    </div>
                    <div className="form main">
                        <div className="theme__container main__page">
                            <div className="display__flex">
                                <div className="theme__img"><img src="/img/меню__.png" width="100%" height="100%"
                                                                 alt=""/></div>
                                <div className="form__theme">VAXO009</div>
                            </div>
                            <div className="theme__title">Моя борьба с депрессией: Надежда и выход</div>
                            <div className="theme__info main__page">
                                Я хочу поделиться с вами своим личным опытом, в надежде, что моя история сможет помочь
                                тем, кто сейчас чувствует себя уязвимым и одиноким из-за депрессии.
                                Несколько лет назад, я оказался в самой темной точке своей жизни. Депрессия охватила
                                меня как чёрная тень, и я чувствовал, что потерял смысл и радость во всём, что ранее мне
                                доставляло удовольствие. Мои дни казались бесконечной борьбой, и мне казалось, что никто
                                не понимает, что я переживаю.
                                Я часто чувствовал, что моя депрессия была как пустота, которая поглощала меня. Однако,
                                в этот момент, когда я был на грани, я нашел поддержку в самых неожиданных местах. Мои
                                близкие и друзья поддерживали меня, даже если они не всегда понимали, что я прохожу. И я
                                нашел профессиональную помощь, обратившись к психологу.
                                <br/>Самое важное, что я хочу сказать, это то, что депрессия - это не конец. Хотя дорога
                                к выздоровлению была долгой и сложной, она была того стоила. Сейчас я чувствую себя
                                сильнее, чем когда-либо, и я хочу сказать тем, кто сейчас борется, что есть надежда. Не
                                стесняйтесь просить помощи, делиться своими чувствами, и помните, что вы не одни.
                                С депрессией можно бороться, и я верю, что каждый из нас может найти свой собственный
                                путь к светлому будущему. Пожалуйста, помните, что вы ценны, и ваша история имеет
                                значение.
                            </div>
                            <div className="action__button">
                                <button className="action__button__element"><img
                                    src='/img/icons8-заполненная-тема-96 1.png' width="110%" height="110%"/></button>
                                <button className="action__button__element"><img src='/img/Vector.png' width="90%"
                                                                                 height="90%"/></button>
                                <div className="like__count">666</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>

    )
}

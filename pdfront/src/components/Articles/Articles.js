import React, {useEffect} from 'react'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'


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
                    <div className="form">
                        <div className="form__title">Меню</div>
                        <div className="form__main">
                            <div className="form info"><Link to={'/a'}>Сотрудники</Link></div>
                            <div className="form info"><Link to={'/a'}>Как записаться</Link></div>
                            <div className="form info"><Link to={'/a'}>Самопомощь</Link></div>
                            <div className="form info"><Link to={'/a'}>Библиотека</Link></div>
                            <div className="form info"><Link to={'/a'}>Треды</Link></div>
                            <div className="form info"><Link to={'/a'}>Главная</Link></div>
                        </div>
                    </div>

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


                    <form id="popupWindow" className="form popup">
                        <div className="popup__container">
                            <div className="scroll">


                                <button className="popup__button">Прочитать все</button>
                                <div className="social__action">
                                    <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%"
                                         height="100%"/>
                                    <div className="popup__info">
                                        <div className="popup__ttile">vaxo0099</div>
                                        <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                                    </div>
                                </div>
                                <div className="social__action">
                                    <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%"
                                         height="100%"/>
                                    <div className="popup__info">
                                        <div className="popup__ttile">vaxo0099</div>
                                        <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                                    </div>
                                </div>
                                <div className="social__action">
                                    <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%"
                                         height="100%"/>
                                    <div className="popup__info">
                                        <div className="popup__ttile">vaxo0099</div>
                                        <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                                    </div>
                                </div>
                                <div className="social__action">
                                    <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%"
                                         height="100%"/>
                                    <div className="popup__info">
                                        <div className="popup__ttile">vaxo0099</div>
                                        <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                                    </div>
                                </div>
                                <div className="social__action">
                                    <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%"
                                         height="100%"/>
                                    <div className="popup__info">
                                        <div className="popup__ttile">vaxo0099</div>
                                        <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                                    </div>
                                </div>
                                <div className="social__action">
                                    <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%"
                                         height="100%"/>
                                    <div className="popup__info">
                                        <div className="popup__ttile">vaxo0099</div>
                                        <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                                    </div>
                                </div>
                                <div className="social__action">
                                    <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%"
                                         height="100%"/>
                                    <div className="popup__info">
                                        <div className="popup__ttile">vaxo0099</div>
                                        <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
                <div className="container right">
                    <div className="under">


                        <div className="form right">
                            <div className="info__block">
                                <div className="info__block__title">
                                    Время работы
                                </div>
                                <div className="info__block__info">
                                    Понедельник - пятница <br/>
                                    с 10:00 до 16:30
                                </div>
                            </div>
                            <div className="info__block">
                                <div className="info__block__title">
                                    Адрес
                                </div>
                                <div className="info__block__info">
                                    Новосущевская, д. 18
                                </div>
                            </div>
                            <div className="info__block">
                                <div className="info__block__title">
                                    Кабинеты
                                </div>
                                <div className="info__block__info">

                                    <br/><br/><br/><br/><br/>
                                </div>
                            </div>
                            <div className="info__block">
                                <div className="info__block__title">
                                    Наши соц сети
                                </div>
                                <div className="info__block__info media">
                                    <div className="media__content">
                                        <img className="media__img first" src="/img/icons8-vk%201.png" alt=""
                                             width="100%" height="100%"/>
                                        вконтакте
                                    </div>
                                    <div>
                                        <div className="media__content">
                                            <img className="media__img"
                                                 src="/img/3380451_telegram_communication_social%20media_message_icon%201.png"
                                                 alt="" width="100%" height="100%"/>
                                            телеграм
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
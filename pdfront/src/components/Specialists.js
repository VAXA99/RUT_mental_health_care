import React, { Component } from 'react'

export function Specialists(){
    return (
        <>
         <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet"></link>
           <div class="display__flex__mt">
                <div class="container left">
                    <div class="form">
                        <div class="form__title">Меню</div>
                        <div class="form__main">
                            <div class="form info"><a href="/login.htm">Сотрудники</a></div>
                            <div class="form info"><a href="/login.htm">Как записаться</a></div>
                            <div class="form info"><a href="/login.htm">Самопомощь</a></div>
                            <div class="form info"><a href="/login.htm">Библиотека</a></div>
                        </div>
                    </div>
                    <div class="form">
                        <div class="form__title">Меню</div>
                        <div class="form__main">
                            <div class="form info"><a href="/login.htm">Сотрудники</a></div>
                            <div class="form info"><a href="/login.htm">Как записаться</a></div>
                            <div class="form info"><a href="/login.htm">Самопомощь</a></div>
                            <div class="form info"><a href="/login.htm">Библиотека</a></div>
                        </div>
                    </div>
                </div>
                <div class="container main">
                    <div class="main__title">Наши специалисты</div>
                    <div class="specialists">
                        <a class="spec__element" href="/index.html">
                            <img class="spec__img" src="/img/Морозова 1.png" alt="" width="90%" height="100%"/>
                            <div class="spec__link"></div>
                        </a>
                        <a class="spec__element" href="/index.html">
                            <img class="spec__img" src="/img/Морозова 1.png" alt="" width="90%" height="100%"/>
                            <div class="spec__info"></div>
                        </a>
                        <a class="spec__element" href="/index.html">
                            <img class="spec__img" src="/img/Морозова 3.png" alt="" width="90%" height="100%"/>
                            <div class="spec__link"></div>
                        </a>
                    </div>

                    <div class="specialists">
                        <a class="spec__element" href="/index.html">
                            <img class="spec__img" src="/img/Морозова 3.png" alt="" width="90%" height="100%"/>
                            <div class="spec__link"></div>
                        </a>
                        <a class="spec__element" href="/index.html">
                            <img class="spec__img" src="/img/Морозова 2.png" alt="" width="90%" height="100%"/>
                            <div class="spec__info"></div>
                        </a>

                        <a class="spec__element" href="/index.html">
                            <img class="spec__img" src="/img/Морозова 3.png" alt="" width="90%" height="100%"/>
                            <div class="spec__link"></div>
                        </a>

                    </div>
                </div>
                <div class="container right">
                    <div class="form right">
                        <div class="info__block">
                            <div class="info__block__title">
                                Время работы
                            </div>
                            <div class="info__block__info">
                                Понедельник - пятница <br/> с 10:00 до 16:30
                            </div>
                        </div>
                        <div class="info__block">
                            <div class="info__block__title">
                                Адрес
                            </div>
                            <div class="info__block__info">
                                Новосущевская, д. 18
                            </div>
                        </div>
                        <div class="info__block">
                            <div class="info__block__title">
                                Кабинеты
                            </div>
                            <div class="info__block__info">

                                <br/><br/><br/><br/><br/>
                            </div>
                        </div>
                        <div class="info__block">
                            <div class="info__block__title">
                                Наши соц сети
                            </div>
                            <div class="info__block__info media">
                                <div class="media__content">
                                    <img class="media__img first" src="/img/icons8-vk 1.png" alt="" width="100%" height="100%"/>
                                    вконтакте
                                </div>
                                <div>
                                    <div class="media__content">
                                        <img class="media__img" src="/img/3380451_telegram_communication_social media_message_icon 1.png" alt="" width="100%" height="100%"/>
                                        телеграм
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
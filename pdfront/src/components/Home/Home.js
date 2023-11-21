import React, { Component } from 'react'


export default function Home() {
    return (
    <>
    <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
    <link href="https://fonts.cdnfonts.com/css/forma-djr-banner" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet"></link>
    <img className="angle top center" src="/img/Star%201.png" />
    
    <div className="display__flex__mt">
    <div className="container left">
    <div className="form">
        <div className="form__title">Меню</div>
        <div className="form__main">
            <div className="form info"><a href="/login.htm">Сотрудники</a></div>
            <div className="form info"><a href="/login.htm">Как записаться</a></div>
            <div className="form info"><a href="/login.htm">Самопомощь</a></div>
            <div className="form info"><a href="/login.htm">Библиотека</a></div>
        </div>
    </div>
    <div className="testing">
        <img src="/img/Опрос.png" alt="" width="115%" height="100%"/>
        <div className="testing__link">
            <div className="get__testing">Пройдите<br/> опрос</div>
            <a href=""><img src="/img/Arrow%203.png" alt=""/></a>
        </div>
       

    </div>
    
    </div>
    <div className="container main">
        <div className="form main">
            <div className="form__block">
                <div className="form__block__title">Запишитесь на прием</div>
                <div className="form__block__info">Нужно только выбрать специалиста и время</div>
            </div>  
            <div className="form__block__link">
                <a href="/login.htm">Записаться</a>
            </div>
        </div>
        <div className="main__links">   
            <div className="links top">
                <div className="links__components">
                    <img className="main__links__comp" src="/img/Студентам.png" alt="" width="105%" height="105%"/>
                    <div className="links__subcomp">
                        <div className="links__comp__text">Студентам <br/>и аспирантам</div>
                        <a href=""><img src="/img/Arrow%202.png" alt=""/></a>
                    </div>
                </div>
                <div className="links__components">
                    <img className="main__links__comp " src="/img/сотрудникам.png" alt="" width="105%" height="110%"/>
                    <div className="links__subcomp empl">
                        <div className="links__comp__text">Сотрудникам <br/>и преподавателям</div>
                        <a href=""><img src="/img/Arrow%202.png" alt=""/></a>
                    </div>
                   
                </div>
            </div>
            <div className="links bottom">
                <div className="links__components">
                    <img className="main__links__comp" src="/img/новости.png" alt="" width="105%" height="105%"/>
                    <div className="links__subcomp news">
                        <div className="links__comp__text">Новости</div>
                        <a href=""><img src="/img/Arrow%202.png" alt=""/></a>
                    </div>
                </div>
                <div className="links__components">
                    <img className="main__links__comp" src="/img/инфо.png" alt="" width="105%" height="105%"/>
                    <div className="links__subcomp">
                        <div className="links__comp__text">Правила <br/>и регламентации</div>
                        <a href=""><img src="/img/Arrow%202.png" alt=""/></a>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    <div className="container right">
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
                       <img className="media__img first" src="/img/icons8-vk%201.png" alt="" width="100%" height="100%"/>
                        вконтакте
                    </div>
                    <div >
                    <div className="media__content">
                       <img className="media__img" src="/img/3380451_telegram_communication_social%20media_message_icon%201.png" alt="" width="100%" height="100%"/>
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
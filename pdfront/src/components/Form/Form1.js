
import { Link } from "react-router-dom"
import Header from "../Header/Header"
import Menu from "../Menu/Menu"

export function Form1(){
    return(
    <>
    <Header/>
    <div className="display__flex__mt">
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet"/>
    <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
    <img className="angle top center" src="/img/Star%201.png" />
    <img className="angle right__home" src="/img/Ellipse 6.png" />
        <div className="container left">
            <Menu/>
           
        </div>
        <div className="container main calendar">
        <div className="form__page__title">Форма психологической помощи</div>
        <div className="form__page__subtitle">Пожалуйста заполните данную форму чтобы мы поняли ваше состояние</div>
            <form className="form main forms one">
                <div className="up__block">
                    <button className="up__block__element blue">
                        1
                    </button>
                    <button className="up__block__element ">
                        2
                    </button>
                </div>
                <div className="problems">
                    <div className="form__page__subtitle">Выберите проблемы которые вам близки.</div>
                    <div className="display__inline">
                    <button className="problem__button"><div className="form info problem">Суицидальность</div></button>
                     <button className="problem__button"><div className="form info problem">Дерпессия</div></button>
                     <button className="problem__button"><div className="form info problem">Утомляемость</div></button>
                     <button className="problem__button"><div className="form info problem">Проблемы на работе</div></button>
                     <button className="problem__button"><div className="form info problem">Проблемы в отношениях</div></button>
                     <button className="problem__button"><div className="form info problem">Перемены настрояния</div></button>
                     <button className="problem__button"><div className="form info problem">Потеря близкого человека</div></button>
                     <button className="problem__button"><div className="form info problem">Девиантное поведение</div></button>
                     <button className="problem__button"><div className="form info problem">Алкоголизм</div></button>
                     <button className="problem__button"><div className="form info problem">Перемены настроянияс</div></button>
                     <button className="problem__button"><div className="form info problem">Потеря близкого человека</div></button>
                    </div>
                </div>
                <div className="button" >
                    <Link to={'/form2'} className="next__step" >Следующий шаг</Link>
                </div>
            </form>
            
            
        </div>
    </div>
    </>

    )
}

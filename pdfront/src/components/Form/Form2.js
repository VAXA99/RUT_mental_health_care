
import { Link } from "react-router-dom"
import Header from "../Header/Header"
import Menu from "../Menu/Menu"

export function Form2(){
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
            <form className="form main forms two">
                <div className="up__block">
                    <button className="up__block__element">
                        1
                    </button>
                    <button className="up__block__element blue">
                        2
                    </button>
                </div>
                <div className="problems">
                    <div className="form__page__subtitle in">Напишите ваши мысли, почему вы решили обратиться за помощью или что бы вы хотели передать психологу.</div>
                    <div className="problems__input">
                        <textarea className="form__page__subtitle input">Начните писать (необязательно)</textarea>
                    </div>
                    <div className="button" >
                        <button className="next__step" >Отправить</button>
                    </div>
                </div>
               
            </form>
            
        </div>
    </div>
    </>

    )
}

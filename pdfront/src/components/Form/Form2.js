import {Link} from "react-router-dom"
import Header from "../Header/Header"
import Menu from "../Menu/Menu"

export function Form2() {
    return (
        <>
            <div className="container main calendar">
                <div className="form__page__title">Форма психологической помощи</div>
                <div className="form__page__subtitle">Пожалуйста заполните данную форму чтобы мы поняли ваше
                    состояние
                </div>
                <form className="form main forms two">
                    <div className="problems">
                        <div className="form__page__subtitle in">Напишите ваши мысли, почему вы решили обратиться за
                            помощью или что бы вы хотели передать психологу.
                        </div>
                        <div className="problems__input">
                                <textarea
                                    className="form__page__subtitle input">Начните писать (необязательно)</textarea>
                        </div>
                        <div className="button">
                            <Link to={'/Calendar'} className="next__step">Выбор даты</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

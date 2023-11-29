import {Link, useNavigate} from "react-router-dom"
import Header from "../Header/Header"
import Menu from "../Menu/Menu"
import {useEffect, useState} from "react";
import auth from "../../backend/Auth";

export function Form1() {

    const [selectedProblems, setSelectedProblems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tokenValid = auth.isTokenValid();
        if (!tokenValid) {
            navigate("/auth")
        }
    }, [navigate]);

    return (
        <>
            <div className="container main calendar">
                <div className="form__page__title">Форма психологической помощи</div>
                <div className="form__page__subtitle">Пожалуйста заполните данную форму чтобы мы поняли ваше
                    состояние
                </div>
                <form className="form main forms one">
                    <div className="problems">
                        <div className="form__page__subtitle">Выберите проблемы которые вам близки.</div>
                        <div className="display__inline">
                            <button className="problem__button">
                                <div className="form info problem">Суицидальность</div>
                            </button>
                            <button className="problem__button">
                                <div className="form info problem">Дерпессия</div>
                            </button>
                            <button className="problem__button">
                                <div className="form info problem">Утомляемость</div>
                            </button>
                            <button className="problem__button">
                                <div className="form info problem">Проблемы на работе</div>
                            </button>
                            <button className="problem__button">
                                <div className="form info problem">Проблемы в отношениях</div>
                            </button>
                            <button className="problem__button">
                                <div className="form info problem">Перемены настрояния</div>
                            </button>
                            <button className="problem__button">
                                <div className="form info problem">Потеря близкого человека</div>
                            </button>
                            <button className="problem__button">
                                <div className="form info problem">Девиантное поведение</div>
                            </button>
                            <button className="problem__button">
                                <div className="form info problem">Алкоголизм</div>
                            </button>
                            <button className="problem__button">
                                <div className="form info problem">Перемены настроянияс</div>
                            </button>
                            <button className="problem__button">
                                <div className="form info problem">Потеря близкого человека</div>
                            </button>
                        </div>
                    </div>
                    <div className="button">
                        <Link to={'/form2'} className="next__step">Следующий шаг</Link>
                    </div>
                </form>
            </div>
        </>

    )
}

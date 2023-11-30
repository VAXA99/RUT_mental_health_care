import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
import auth from "../../backend/Auth";

export function Form1({ onSubmit }) {

    const [selectedProblems, setSelectedProblems] = useState([]);

    const handleCheckboxChange = (problem) => {
        // Update the selected problems based on checkbox changes
        const updatedProblems = [...selectedProblems];
        const index = updatedProblems.indexOf(problem);

        if (index !== -1) {
            updatedProblems.splice(index, 1);
        } else {
            updatedProblems.push(problem);
        }

        setSelectedProblems(updatedProblems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Call the onSubmit callback with the collected data
        onSubmit(selectedProblems);
    };

    return (
        <>
            <div className="container main calendar">
                <div className="form__page__title">Форма психологической помощи</div>
                <div className="form__page__subtitle">Пожалуйста заполните данную форму чтобы мы поняли ваше
                    состояние
                </div>
                <form className="form main forms one" onSubmit={handleSubmit}>
                    <div className="problems">
                        <div className="form__page__subtitle">Выберите проблемы которые вам близки.</div>
                        <div className="display__inline">
                            {[
                               "Суицидальность",
                                "Депрессия",
                                "Утомляемость",
                                "Проблемы на работе",
                                "Проблемы в отношениях",
                                "Перемены настрояния",
                                "Потеря близкого человека",
                                "Девиантное поведение",
                                "Алкоголизм",
                                "Перемены настрояния",
                                "Потеря близкого человека",
                            ].map((problem, index) => (
                                <div key={index} className="problem__button">
                                    <label>
                                        <input className='checkbox__none'
                                            type="checkbox"
                                            value={problem}
                                            onChange={() => handleCheckboxChange(problem)}
                                        />
                                        <div className="form info problem">{problem}</div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="button">
                        <button type={"submit"} className="next__step">Следующий шаг</button>
                    </div>
                </form>
            </div>
        </>

    )
}

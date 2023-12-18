import React, {useEffect, useState} from "react";

export function Form2({onSubmit, initialData}) {

    const [thoughts, setThoughts] = useState(initialData?.thoughts || "");

    useEffect(() => {
        // Update the thoughts when initialData changes
        setThoughts(initialData?.thoughts || "");
    }, [initialData]);
    const handleTextareaChange = (e) => {
        // Update the thoughts based on textarea changes
        setThoughts(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Call the onSubmit callback with the collected data
        onSubmit({ thoughts });
    };


    return (
        <>
            <div className="container main calendar">
                <div className="form__page__title">Форма психологической помощи</div>
                <div className="form__page__subtitle">
                    Пожалуйста заполните данную форму чтобы мы поняли ваше состояние
                </div>
                <form className="form main forms two" onSubmit={handleSubmit}>
                    <div className="problems">
                        <div className="form__page__subtitle in">
                            Напишите ваши мысли, почему вы решили обратиться за помощью или что
                            бы вы хотели передать психологу.
                        </div>
                        <div className="problems__input">
                            <textarea
                                name="textarea"
                                className="form__page__subtitle input"
                                value={thoughts}
                                onChange={handleTextareaChange}
                                placeholder={"Начните писать (необязательно)"}
                            ></textarea>
                        </div>
                        <div className="button">
                            <button type="submit" className="next__step">
                                Следующий шаг
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

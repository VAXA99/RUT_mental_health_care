import React from "react";

export function Form2({onNext}) {
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform any additional logic or validation here

        // Get the inputted text from the textarea
        const inputText = e.target.elements.textarea.value;
        console.log("Inputted text:", inputText);

        // Trigger the next step within the parent component
        onNext();
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
                                defaultValue={""}
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

import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react";
import auth from "../../backend/Auth";
import consultation from "../../backend/Consultation";

export function Form1({ onSubmit }) {

    const [selectedProblems, setSelectedProblems] = useState([]);
    const [problemsFromBackend, setProblemsFromBackend] = useState([]);

    useEffect(() => {
        // Fetch problems from the backend when the component mounts
        const fetchProblems = async () => {
            try {
                // Assuming your backend API provides a function to get problems
                const problems = await consultation.getAllTags();
                setProblemsFromBackend(problems);
            } catch (error) {
                console.error("Error fetching problems from the backend", error);
            }
        };

        fetchProblems();
    }, []);

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
                            {problemsFromBackend.map((problem, index) => (
                                <div key={index} className="problem__button">
                                    <label>
                                        <input
                                            className="checkbox__none"
                                            type="checkbox"
                                            value={problem.description}
                                            onChange={() => handleCheckboxChange(problem.description)}
                                        />
                                        <div className="form info problem">{problem.description}</div>
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

import React, {useEffect, useState} from "react";
import {getUserProfilePhoto} from "../../backend/UserProfile";
import auth from "../../backend/Auth";
import axios from "axios";
import baseUrl from "../../backend/base-url";
import {useNavigate} from "react-router-dom";
import consultation from "../../backend/Consultation";

export default function FormSubmission({selectedConsultation, thoughts, problems, onBackStep}) {
    const {psychologist, startsAt} = selectedConsultation;
    const [psychologistProfilePicture, setPsychologistProfilePicture] = useState();
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const navigate = useNavigate();

    const handleBackStep = () => {
        // Call the parent's callback to handle the navigation
        onBackStep();
    };

    console.log(thoughts);
    useEffect(() => {
        const fetchPsychologistProfilePicture = async () => {
            try {
                if (psychologist) {
                    const response = await getUserProfilePhoto(psychologist.username);
                    setPsychologistProfilePicture(response);
                }
            } catch (error) {
                console.error('Error fetching psychologist profile picture:', error);
            }
        };

        fetchPsychologistProfilePicture();
    }, [psychologist]);

    const startsAtMoscowTime = startsAt ? new Date(startsAt).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'}) : '';

    const handleSubmission = async () => {
        try {
            const userId = auth.getUserId();
            const psychProblems = problems;
            const description = thoughts.thoughts;

            // Create ConsultationRequest object
            const consultationRequest = {
                userId,
                psychProblems,
                description,
            };

            // Simulate a submission delay for 2 seconds
            setSubmissionStatus("submitting");
            setTimeout(async () => {
                const response = await consultation.setUpConsultation(selectedConsultation.id, consultationRequest);
                // Assume success after the delay
                setSubmissionStatus("success");

                // Wait for an additional 2 seconds before navigating
                setTimeout(() => {
                    // Navigate to "/"
                    window.location.href = "/";
                }, 2000);
            }, 2000);
        } catch (error) {
            console.error("Error setting up consultation:", error);
            // Set submission error status
            setSubmissionStatus("error");
        }
    };

    return (<div className="button calendar">
        <div className="container main calendar">
            <div className="form__page__title">Зпись на прием</div>
            <form className="form main forms one">
                <div className="problems">
                    <div className="select__time">
                        <div className="articles__form calendar">Подтвердите данные</div>
                    </div>
                    <div className="form__page__subtitle calendar">
                        информация о приеме будет выслана на вашу почту
                    </div>
                    <div className="display__flex__mt">
                        {/* Display selected psychologist information */}
                        {psychologist && psychologistProfilePicture && (<div className="profile__photo">
                            <img
                                className="spec__img"
                                height="80%"
                                width="70%"
                                src={psychologistProfilePicture.src}
                                alt={`Photo of ${psychologist.surname}`}
                            />
                            <div className="form__theme">Ваш врач</div>
                        </div>)}
                        <div className="read__input__data">
                            <div className="worker forms">Данные о времени и дате записи</div>
                            <div className="data__info">
                                {/* Display selected time and date */}
                                <div className="form time forms">{startsAtMoscowTime}</div>
                                {/* Add other date formatting options if needed */}
                            </div>
                            <div className="worker forms">Выбранные данные</div>
                            <div className="display__inline">
                                {/* Display selected problems */}
                                {problems.map((problem, index) => (
                                    <div key={index} className="problem__button forms">
                                        <div className="form info problem forms">{problem}</div>
                                    </div>))}
                            </div>
                            <div className="problems__input forms">
                                    <textarea
                                        name="textarea"
                                        className="form__page__subtitle input forms"
                                        defaultValue={thoughts.thoughts}
                                        placeholder={"Вы ничего не написали"}
                                        readOnly
                                    ></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space__between">
                    {/* Uncomment and add event handlers as needed */}
                    <button type={"button"} className="next__step back" onClick={handleBackStep}>
                        Назад
                    </button>
                    <button type={"button"} className="next__step" onClick={handleSubmission}>
                        Подтвердить
                    </button>
                </div>
                {/* Display submission status */}
                {submissionStatus === "submitting" && (
                    <div className="submission-status">Отправка...</div>
                )}
                {submissionStatus === "success" && (
                    <div className="submission-status success">✅ Успешно</div>
                )}
                {submissionStatus === "error" && (
                    <div className="submission-status error">
                        ❌ Произошла ошибка. Попробуйте еще раз.
                    </div>
                )}
            </form>
        </div>
    </div>);
}

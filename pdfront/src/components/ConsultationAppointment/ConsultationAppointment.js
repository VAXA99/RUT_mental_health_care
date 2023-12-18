import React, {useEffect, useState} from "react";
import {Form1} from "../Form/Form1";
import {Form2} from "../Form/Form2";
import Calendar from "../Calendar/Calendar";
import Menu from "../Menu/Menu";
import {useNavigate} from "react-router-dom";
import Auth from "../../backend/Auth";
import {Form3} from "../Form/Form3";
import auth from "../../backend/Auth";
import axios from "axios";
import baseUrl from "../../backend/base-url";
import {useUserContext} from "../../UserProvider";


export function ConsultationAppointment() {
    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [form1Data, setForm1Data] = useState([]);
    const [form2Data, setForm2Data] = useState("");
    const [form3Data, setForm3Data] = useState("");
    const [selectedConsultation, setSelectedConsultation] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [chosenPsychologistId, setChosenPsychologistId] = useState(null);
    const { userProfilePicture, setUserProfilePicture } = useUserContext();
    const [problemsFromBackend, setProblemsFromBackend] = useState([]);



    const handleForm1Data = (data) => {
        setForm1Data(data);
        handleNext();
    };
    const handleForm2Data = (data) => {
        setForm2Data(data);
        handleNext();
    };
    const handleForm3Data = (data) => {
        setForm3Data(data);
        setChosenPsychologistId(data.userId);
        handleNext();
    };

    const handleConsultationSelect = ({ selectedConsultation }) => {
        setSelectedConsultation(selectedConsultation);
        handleNext();
    };

    const handleFirstStep = () => {
        setStep(1);
    };

    const handleSecondStep = () => {
        setStep(2);
    };

    const handleThirdStep = () => {
        setStep(3);
    };

    const handleFourthStep = () => {
        setStep(4);
    };

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            const tokenValid = Auth.isTokenValid();
            setAuthenticated(tokenValid);
            if (!tokenValid) {
                navigate("/auth")
            }
        }, 1000); // Check every second

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleSubmission = async () => {

        try{
            const userId = auth.getUserId();
            const psychProblems = form1Data;
            const description = form2Data.description;

            // Create ConsultationRequest object
            const consultationRequest = {
                userId,
                psychProblems,
                description,
            };


            const response = await axios.post(`${baseUrl}/consultations/setUp/${selectedConsultation.id}`, consultationRequest);

            // Handle the response as needed
            console.log('Consultation setup response:', response.data);
        } catch (error) {
            console.error('Error setting up consultation:', error);
        }


    };


    return (
        <>
            <div className="display__flex__mt">
                <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                      rel="stylesheet"/>
                <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
                <img className="angle top center" src="/img/Star%201.png"/>
                <img className="angle right__home" src="/img/Ellipse 6.png"/>
                <div className="container left">
                    <Menu/>
                </div>
                {/* Navigation buttons */}

                <div className="container main calendar">
                    <div className="up__block">
                        {step === 1 && (
                            <div>
                                <button className="up__block__element blue" onClick={handleFirstStep}>
                                    1
                                </button>
                                <button className="up__block__element" onClick={handleSecondStep}>
                                    2
                                </button>
                                <button className="up__block__element" onClick={handleThirdStep}>
                                    3
                                </button>
                                <button className="up__block__element" onClick={handleFourthStep}>
                                    4
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div>
                                <button className="up__block__element" onClick={handleFirstStep}>
                                    1
                                </button>
                                <button className="up__block__element blue" onClick={handleSecondStep}>
                                    2
                                </button>
                                <button className="up__block__element" onClick={handleThirdStep}>
                                    3
                                </button>
                                <button className="up__block__element" onClick={handleFourthStep}>
                                    4
                                </button>
                            </div>
                        )}
                        {step === 3 && (
                            <div>
                                <button className="up__block__element" onClick={handleFirstStep}>
                                    1
                                </button>
                                <button className="up__block__element" onClick={handleSecondStep}>
                                    2
                                </button>
                                <button className="up__block__element blue" onClick={handleThirdStep}>
                                    3
                                </button>
                                <button className="up__block__element" onClick={handleFourthStep}>
                                    4
                                </button>
                            </div>
                        )}
                        {step === 4 && (
                            <div>
                                <button className="up__block__element" onClick={handleFirstStep}>
                                    1
                                </button>
                                <button className="up__block__element" onClick={handleSecondStep}>
                                    2
                                </button>
                                <button className="up__block__element" onClick={handleThirdStep}>
                                    3
                                </button>
                                <button className="up__block__element blue" onClick={handleFourthStep}>
                                    4
                                </button>
                            </div>
                        )}
                    </div>
                    {step === 1 && (
                        <Form1 onSubmit={handleForm1Data} />
                    )}
                    {step === 2 && (
                        <Form2 onSubmit={handleForm2Data} />
                    )}
                    {step === 3 && (
                        <Form3 onSubmit={handleForm3Data}/>
                    )}
                    {step === 4 && (
                        <Calendar onConsultationSelect={handleConsultationSelect} chosenPsychologistId={chosenPsychologistId}
                        />
                    )}
                    {step === 5 && (
                        <div className="button calendar">

                            <div className="container main calendar">
                                <div className="form__page__title">Зпись на прием</div>

                                <form className="form main forms one" >
                                    <div className="problems">
                                        <div className='select__time'>
                                            <div className="articles__form calendar">Подтвердите данные</div>
                                        </div>
                                        <div className='form__page__subtitle calendar'>
                                            информация о приеме будет выслана на вашу почту
                                        </div>
                                        <div className="display__flex__mt">
                                            <div className="profile__photo">
                                               <img  className='spec__img' height="80%" width="70%" src="/img/морозовабез.png"/>
                                                <div className='form__theme'>Ваш врач</div>
                                            </div>
                                            <div className='read__input__data'>
                                                <div className='worker forms'>Данные о времени и дате записи</div>
                                                <div className='data__info'>
                                                    <div className="form time forms">
                                                        10:00
                                                    </div>
                                                    <div className='worker'>12 ноября 2023</div>
                                                </div>
                                                <div className='worker forms'>Выбранные данные</div>
                                                <div className="display__inline">
                                                    <div className="problem__button forms">
                                                            <div className="form info problem forms">Алкоголизм</div>
                                                    </div>
                                                    <div className="problem__button forms">
                                                        <div className="form info problem forms">Алкоголизм</div>
                                                    </div>
                                                </div>
                                                <div className="problems__input forms">
                                                        <textarea
                                                            name="textarea"
                                                            className="form__page__subtitle input forms"
                                                            defaultValue={""}
                                                            placeholder={"Начните писать (необязательно)"}
                                                            readOnly
                                                        ></textarea>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className='space__between'>
                                        <button className="next__step back" onClick={handleFourthStep}>
                                            Назад
                                        </button>
                                        <button className="next__step" onClick={handleSubmission}>
                                            Подтвердить
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}
import React, {useEffect, useState} from "react";
import {Form1} from "../Form/Form1";
import {Form2} from "../Form/Form2";
import Calendar from "../Calendar/Calendar";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import {useNavigate} from "react-router-dom";
import Auth from "../../backend/Auth";
import consultation from "../../backend/Consultation";
import {Form3} from "../Form/Form3";


export function ConsultationAppointment() {
    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [form1Data, setForm1Data] = useState([]);
    const [form2Data, setForm2Data] = useState("");
    const [form3Data, setForm3Data] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [chosenPsychologistId, setChosenPsychologistId] = useState(null);

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

    const handleDateTimeSelect = ({ selectedTime, selectedDate }) => {
        setSelectedTime(selectedTime);
        setSelectedDate(selectedDate);
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

    const handleSubmission = () => {
        // Add any additional logic you need before submission
        // For example, you might want to send the collected data to a server here

        // Log the gathered information
        console.log("Tags: ", form1Data);
        console.log("Additional information: ", form2Data);
        console.log('Selected Time: ', selectedTime);
        console.log("Psychologist: ", form3Data);
        console.log("Psychologist id: ", form3Data.userId);

        const formattedDate = selectedDate.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });

        console.log('Selected date: ', formattedDate);
        // console.log(consultation.getAvailableConsultationsForDate(formattedDate, form3Data.userId));
        // Add any additional logic after submission
        // For example, navigate to the next page
    };


    return (
        <>
            <Header/>
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
                        <Calendar onDateTimeSelect={handleDateTimeSelect} chosenPsychologistId={chosenPsychologistId}
                        />
                    )}
                    {step === 5 && (
                        <div className="button calendar">
                            <button className="next__step" onClick={handleSubmission}>
                                Записаться
                            </button>
                            <button onClick={handleFourthStep}>
                                fuck go back
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}
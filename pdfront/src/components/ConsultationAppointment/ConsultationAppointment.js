import React, {useEffect, useState} from "react";
import {Form1} from "../Form/Form1";
import {Form2} from "../Form/Form2";
import Calendar from "../Calendar/Calendar";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import {useNavigate} from "react-router-dom";
import Auth from "../../backend/Auth";


export function ConsultationAppointment() {
    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedProblems, setSelectedProblems] = useState([]);
    const [problemDescription, setProblemDescription] = useState('');

    // const [formData, setFormData] = useState({
    //     selectedProblems: [],
    //     problemDescription: '',
    //     selectedDate: null,
    //     selectedTime: null,
    // });

    const handleFirstStep = () => {
        setStep(1);
    };

    const handleSecondStep = () => {
        setStep(2);
    };

    const handleThirdStep = () => {
        setStep(3);
    };

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handleForm1Submit = (selectedProblems) => {
        setSelectedProblems(selectedProblems);
        handleNext();
    };

    const handleForm2Submit = (problemDescription) => {
        setProblemDescription(problemDescription);
        handleNext();
    };

    const handleCalendarSubmit = (selectedDate, selectedTime) => {
        setSelectedDate(selectedDate);
        setSelectedTime(selectedTime);
    };

    const handleAppointmentBooking = () => {
        console.log('Form data: \n', selectedProblems, '\n', problemDescription, '\n', selectedDate, '\n', selectedTime);
    }


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
                            </div>
                        )}
                    </div>
                    {step === 1 && (
                        <Form1
                            selectedProblems={setSelectedProblems}
                            onNext={handleForm1Submit}
                        />
                    )}
                    {step === 2 && (
                        <Form2
                            problemDescription={setProblemDescription}
                            onNext={handleForm2Submit}
                        />
                    )}
                    {step === 3 && (
                        <>
                            <Calendar
                                onDateChange={setSelectedDate}
                                onTimeChange={setSelectedTime}
                                onAppointmentBooking={handleCalendarSubmit}
                            />
                            <div className="button calendar">
                                <button className="next__step" onClick={handleAppointmentBooking}>
                                    Записаться
                                </button>
                            </div>
                        </>
                    )}
                </div>

            </div>
        </>
    );
}
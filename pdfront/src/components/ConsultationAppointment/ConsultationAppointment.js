import React, {useState} from "react";
import {Form1} from "../Form/Form1";
import {Form2} from "../Form/Form2";
import Calendar from "../Calendar/Calendar";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";


export function ConsultationAppointment() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        selectedProblems: [],
        problemDescription: '',
        selectedDate: null,
        selectedTime: null,
    });

    const handleFirstStep = () => {
        setStep(1);
    };

    const handleSecondStep = () => {
        setStep(2);
    };

    const handleNext = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const handleThirdStep = () => {
        setStep(3);
    };

    const handleForm1Submit = (selectedProblems) => {
        setFormData({
            ...formData,
            selectedProblems,
        });
        handleNext();
    };

    const handleForm2Submit = (problemDescription) => {
        setFormData({
            ...formData,
            problemDescription,
        });
        handleNext();
    };

    const handleCalendarSubmit = (selectedDate, selectedTime) => {
        setFormData({
            ...formData,
            selectedDate,
            selectedTime,
        });
        // Now you can send formData to the backend
        // You may want to use a library like axios to make a network request
        // Example: axios.post('/api/submitFormData', formData);
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
                            selectedProblems={formData.selectedProblems}
                            onSubmit={handleForm1Submit}
                        />
                    )}
                    {step === 2 && (
                        <Form2
                            problemDescription={formData.problemDescription}
                            onSubmit={handleForm2Submit}
                        />
                    )}
                    {step === 3 && (
                        <Calendar
                            selectedDate={formData.selectedDate}
                            selectedTime={formData.selectedTime}
                            onSubmit={handleCalendarSubmit}
                        />
                    )}
                </div>

            </div>
        </>
    );
}
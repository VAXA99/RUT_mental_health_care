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
import FormSubmission from "../Form/FormSubmission";
import consultation from "../../backend/Consultation";


export function ConsultationAppointment() {
    const [step, setStep] = useState(1);
    const [form1Data, setForm1Data] = useState([]);
    const [form2Data, setForm2Data] = useState("");
    const [form3Data, setForm3Data] = useState("");
    const [selectedConsultation, setSelectedConsultation] = useState([]);
    const [chosenPsychologistId, setChosenPsychologistId] = useState(null);
    const navigate = useNavigate();
    const [hasActiveConsultation, setHasActiveConsultation] = useState(null);

    useEffect(() => {
        const checkActiveConsultation = async () => {
            try {
                // Assuming you have access to the user ID in your component
                const stringUserId = auth.getUserId(); // Replace with the actual user ID
                const hasActiveConsultation = await consultation.hasActiveConsultationSetUp(stringUserId);
                console.log(hasActiveConsultation);
                if (hasActiveConsultation.data) {
                    // User has an active consultation, show an alert and navigate back
                    alert("У вас уже есть активная запись\nВы не можете записаться до посещения консультации");
                    navigate(-1); // Navigates back one step in the history stack
                } else {
                    // User does not have an active consultation, continue with your logic
                    setHasActiveConsultation(false);
                    // Additional logic or state updates if needed
                }
            } catch (error) {
                console.error(error);
                setHasActiveConsultation(false); // Set to false if there's an error
                // Handle errors or additional logic if needed
            }
        };

        checkActiveConsultation();
    }, [navigate]);


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
                        <Form1 onSubmit={handleForm1Data} initialData={form1Data}/>
                    )}
                    {step === 2 && (
                        <Form2 onSubmit={handleForm2Data} initialData={form2Data} />
                    )}
                    {step === 3 && (
                        <Form3 onSubmit={handleForm3Data} initialData={form3Data}/>
                    )}
                    {step === 4 && (
                        <Calendar onConsultationSelect={handleConsultationSelect} chosenPsychologistId={chosenPsychologistId}
                        />
                    )}
                    {step === 5 && (
                        <FormSubmission selectedConsultation={selectedConsultation} thoughts={form2Data} problems={form1Data} onBackStep={handleFirstStep}/>
                    )}
                </div>

            </div>
        </>
    );
}
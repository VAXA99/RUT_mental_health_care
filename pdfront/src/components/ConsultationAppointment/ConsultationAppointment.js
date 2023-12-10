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
import auth from "../../backend/Auth";
import axios from "axios";
import baseUrl from "../../backend/base-url";


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
            // Log the gathered information
            // console.log("UserId: ", auth.getUserId());
            // console.log("Tags: ", form1Data);
            // console.log("Additional information: ", form2Data);
            // console.log("Selected consultation: ", selectedConsultation)
            // console.log("Psychologist: ", form3Data);
            // console.log("Psychologist id: ", form3Data.userId);

            const userId = auth.getUserId();
            const psychProblems = form1Data; // Assuming form2Data is an array of psych problems
            const description = form2Data.description; // Assuming form2Data has a description property

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
                        <Calendar onConsultationSelect={handleConsultationSelect} chosenPsychologistId={chosenPsychologistId}
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
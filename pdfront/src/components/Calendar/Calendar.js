import React, {useState} from 'react'
import CalendarComponent from './CalendarComponent';
import TimeComponent from "./TimeComponent";


export default function Calendar({onConsultationSelect, chosenPsychologistId}) {

    const [selectedConsultation, setSelectedConsultation] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleTimeSelection = (consultation) => {
        setSelectedConsultation(consultation);
    };

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    const handleClick = (e) => {
        e.preventDefault();
        // Pass the selected date and time to the parent
        onConsultationSelect({
            selectedConsultation
        });
    };

    return (
        <>
            <div className="container main calendar ">
                <div className="form__page__title">Запись на прием</div>
                <div className="form main forms">
                    <div className='calendar__form__container'>
                        <form onSubmit={handleClick}>
                            <div className='display__flex__mt calendar'>
                                <div className='sub__form__cont'>
                                    <div className='select__time'>
                                        <div className="articles__form calendar">Выберите дату и время</div>
                                    </div>
                                    <div className='form__page__subtitle calendar'> информация о приеме будет
                                        выслана на вашу почту
                                    </div>
                                    {selectedDate && (
                                        <React.Fragment>
                                            <TimeComponent onTimeSelect={handleTimeSelection}
                                                           selectedDate={selectedDate}
                                                           psychologistId={chosenPsychologistId}/>
                                        </React.Fragment>
                                    )}
                                </div>
                                <CalendarComponent onDateSelect={handleDateSelection}
                                                   psychologistId={chosenPsychologistId}/>
                            </div>
                            <div className="button calendar">
                                <button className="next__step" type={"submit"}>
                                    Следующий шаг
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

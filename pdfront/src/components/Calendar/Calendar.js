import React, {useState} from 'react'
import CalendarComponent from './CalendarComponent';
import TimeComponent from "./TimeComponent";


export default function Calendar({ onDateTimeSelect }) {

    const [selectedTime, setSelectedTime] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    const handleClick = (e) => {
        e.preventDefault();
        // Pass the selected date and time to the parent
        onDateTimeSelect({
            selectedTime,
            selectedDate,
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
                                <div>
                                    <div className='select__time'>
                                        <div className="articles__form calendar">Выберите время и дату</div>
                                    </div>
                                    <div className='form__page__subtitle calendar'> информация о приеме будет
                                        выслана на вашу почту
                                    </div>
                                    <TimeComponent onTimeSelect={handleTimeSelection} />
                                    <div className="selected-time">
                                        {selectedTime && <p>Выбранное время: {selectedTime}</p>}
                                    </div>
                                </div>
                                <CalendarComponent onDateSelect={handleDateSelection} />
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

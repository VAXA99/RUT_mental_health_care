import React, {useState} from 'react'
import CalendarComponent from '../Calendar/CalendarComponent';
import TimeComponent from "../Calendar/TimeComponent";


export function Form3({ onDateTimeSelect }) {

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
                                <div className='sub__form__cont'>
                                    <div className='select__time'>
                                        <div className="articles__form calendar">Выберите время и дату</div>
                                    </div>
                                    <div className='form__page__subtitle calendar'> информация о приеме будет
                                        выслана на вашу почту
                                    </div>
                                    <div className="specialists">
                                        <div className="spec__element" >
                                            <img className="spec__img" src="/img/Морозова%203.png" alt="" width="100%" height="100%"/>
                                            <div className="spec__link"></div>
                                            <input className='checkbox__none' type="radio" name={1}/>
                                        </div>
                                        <div className="spec__element" >
                                            <img className="spec__img" src="/img/Морозова%203.png" alt="" width="100%" height="100%"/>
                                            <div className="spec__link"></div>
                                            <input className='checkbox__none' type="radio" name={1}/>
                                        </div>

                                        <div className="spec__element" >
                                            <img className="spec__img" src="/img/Морозова%203.png" alt="" width="100%" height="100%"/>
                                            <div className="spec__link"></div>
                                            <input className='checkbox__none' type="radio" name={1}/>
                                        </div>
                                        <div className="spec__element" >
                                            <img className="spec__img" src="/img/Морозова%203.png" alt="" width="100%" height="100%"/>
                                            <div className="spec__link"></div>
                                            <input className='' type="radio" name={1}/>
                                        </div>
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

import React, {useEffect, useState} from 'react'
import Menu from '../Menu/Menu';
import "./psychoForm.css"
import CalendarComponent from "../Calendar/CalendarComponent";
import auth from "../../backend/Auth";
import consultation from "../../backend/Consultation";


export default function PsychoSchedule() {

    const scrollingUserId = auth.getUserId();

    const [selectedDate, setSelectedDate] = useState(null);
    const [consultations, setConsultations] = useState([]);


    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                if (selectedDate && scrollingUserId) {
                    const response = await consultation.getAllUnavailable(selectedDate, scrollingUserId);
                    console.log("ВОТ ТУТ ГАВНО", response.data);
                    setConsultations(response.data);
                }
            } catch (error) {
                console.error('Error fetching available consultations:', error);
            }
        };

        fetchConsultations();
    }, [selectedDate, scrollingUserId]);

    const handleDateSelection = (date) => {
        setSelectedDate(date);
    };

    const createTimeSlots = () => {
        if (!selectedDate) {
            return null;
        }

        const timeSlots = ['10:00-11:30', '12:00-13:30', '14:00-15:30', '16:00-17:30'];

        return timeSlots.map((timeSlot, index) => {
            const [startTime, endTime] = timeSlot.split('-');

            // Find the consultation for the current time slot
            const consultationForTimeSlot = consultations.find(
                (consultation) => new Date(consultation.startsAt).getHours() === parseInt(startTime, 10)
            );

            return (
                <div key={index} className={`recording__row${consultationForTimeSlot ? ' focus' : ''}`}>
                    <div className='left__spans'>
                        <div className='recording__number'>{index + 1}</div>
                        <div className='recording__time'>{`${startTime}-${endTime}`}</div>
                    </div>
                    <div className='recording__name'>
                        {consultationForTimeSlot
                            ? `${consultationForTimeSlot.patient.name} ${consultationForTimeSlot.patient.surname}`
                            : 'Окно'}
                    </div>
                </div>
            );
        });
    };


    return (
        <>
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/forma-djr-banner" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                  rel="stylesheet"></link>
            <img className="angle top center" src="/img/Star%201.png"/>
            <img className="angle right__home" src="/img/Ellipse 6.png"/>


            <div className="display__flex__mt overflow">
                <div className="container left">
                    <Menu/>

                </div>
                <div className="container main psycho__form">
                    {/*<table className="psycho__form__head">*/}
                    {/*    <thead className="week__days">*/}
                    {/*    <th></th>*/}
                    {/*        <th>Пн</th>*/}
                    {/*        <th>Вт</th>*/}
                    {/*        <th>Ср</th>*/}
                    {/*        <th>Чт</th>*/}
                    {/*        <th>Пт</th>*/}
                    {/*        <th>Сб</th>*/}
                    {/*        <th>Вс</th>*/}
                    {/*        <th></th>*/}
                    {/*    </thead>*/}
                    {/*    <tbody className="week__numbers">*/}
                    {/*        <button type={"button"} className='month__button'>*/}
                    {/*            <img src="/img/кнопка%20влево.png" alt="" width='80%'/>*/}
                    {/*        </button>*/}
                    {/*        <td className='week__numbers__element focus'>30</td>*/}
                    {/*        <td className='week__numbers__element'>31</td>*/}
                    {/*        <td className='week__numbers__element'>1</td>*/}
                    {/*        <td className='week__numbers__element'>2</td>*/}
                    {/*        <td className='week__numbers__element'>3</td>*/}
                    {/*        <td className='week__numbers__element'>4</td>*/}
                    {/*        <td className='week__numbers__element'>5</td>*/}
                    {/*        <button type={"button"}  className='month__button'>*/}
                    {/*            <img src="/img/кнопка%20вправо.png" alt=""  width='80%'/>*/}
                    {/*        </button>*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                    <div className="display__flex__mt">
                        {selectedDate ? (
                            <div className='sub__form__cont psycho__form'>
                                {createTimeSlots()}
                            </div>
                        ):(<div className='recording__name'>Выберите дату, чтобы увидеть расписание на этот день</div>)

                        }
                        <CalendarComponent psychologistId={scrollingUserId} onDateSelect={handleDateSelection}/>
                    </div>
                </div>

            </div>
        </>
    )
}
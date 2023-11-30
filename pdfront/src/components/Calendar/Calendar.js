import React, {Component} from 'react'
import CalendarComponent from './CalendarComponent';
import TimeComponent from "./TimeComponent";


export default class Calendar extends Component {

    state = {
        selectedDate: null,
        selectedTime: null,
    };

    handleDateChange = (date) => {
        this.setState({selectedDate: date});
    };

    handleTimeChange = (time) => {
        this.setState({selectedTime: time});
    };

    handleAppointmentBooking = () => {
        // Access selectedDate and selectedTime from this.state and perform actions
        console.log('Selected Date:', this.state.selectedDate);
        console.log('Selected Time:', this.state.selectedTime);
        // Add logic to handle the gathered information
    };

    /*Рассчет вида календаря*/
    render() {

        return (
            <>
                <div className="container main calendar ">
                    <div className="form__page__title">Запись на прием</div>
                    <div className="form main forms">
                        <div className='calendar__form__container'>
                            <div>

                                <div className='display__flex__mt calendar'>
                                    <div>
                                        <div className='select__time'>
                                            <div className="articles__form calendar">Выберите время и дату</div>
                                        </div>
                                        <div className='form__page__subtitle calendar'> информация о приеме будет
                                            выслана на вашу почту
                                        </div>
                                        <TimeComponent onTimeChange={this.props.handleTimeChange}/>
                                    </div>
                                    <CalendarComponent onTimeChange={this.props.handleDateChange}/>
                                </div>
                                <div className="button calendar">
                                    <button className="next__step" onClick={this.handleAppointmentBooking}>
                                        Записаться
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

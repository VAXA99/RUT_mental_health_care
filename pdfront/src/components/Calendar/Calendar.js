import React, {Component} from 'react'
import CalendarComponent from './CalendarComponent';



export default class Calendar extends Component {

    static defaultProps = {
        onDateSelect: Function.prototype,
        onTimeSelect: Function.prototype
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null,
        selectedTime: null,
    };

    handleTimeClick = (time) => {
        console.log(time);
        this.setState({ selectedTime: time });
    };


    /*Рассчет вида календаря*/
    render() {

        return (
            <>

                <div className="container main calendar ">
                    <div className="form__page__title">Запись на прием</div>
                    <div className="form main forms">
                        <div className='calendar__form__container'>
                            {/*<form>*/}
                                <div className='display__flex__mt calendar'>
                                    <div className='calendar__form__left'>
                                        <div className='select__time'>
                                            <div className="articles__form calendar">Выберите время и дату</div>
                                        </div>
                                        <div className='form__page__subtitle calendar'> информация о приеме будет
                                            выслана на вашу почту
                                        </div>
                                        <div className='time__buttons'>
                                            <button onClick={() => this.props.onTimeSelect({ hours: 10, minutes: 0 })} className='form time'>
                                                10:00
                                            </button>
                                            <button onClick={() => this.props.onTimeSelect({ hours: 12, minutes: 0 })} className='form time'>
                                                12:00
                                            </button>
                                            <button onClick={() => this.props.onTimeSelect({ hours: 14, minutes: 0 })} className='form time'>
                                                14:00
                                            </button>
                                            <button onClick={() => this.props.onTimeSelect({ hours: 16, minutes: 0 })} className='form time'>
                                                16:00
                                            </button>
                                        </div>
                                        <div className="button calendar">
                                            <button type={"submit"} className="next__step">Записаться</button>
                                        </div>
                                    </div>
                                    <CalendarComponent onDateSelect={this.handleDayClick} onTimeSelect={this.handleTimeClick} />
                                </div>
                            {/*</form>*/}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

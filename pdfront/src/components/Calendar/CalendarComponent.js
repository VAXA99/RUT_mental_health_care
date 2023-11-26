import React, {Component} from 'react';
import * as calendarFunctions from './calendarFunctions'
import classNames from 'classnames';


export default class CalendarComponent extends Component {

    static defaultProps = {
        date: new Date(),
        years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030],
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        weekDayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        onChange: Function.prototype
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null
    };

    get year() {
        return this.state.date.getFullYear();
    }

    get month() {
        return this.state.date.getMonth();
    }

    handlePrevButtonClick = () => {
        const date = new Date(this.year, this.month - 1)

        this.setState({date});
    };

    handleNextButtonClick = () => {
        const date = new Date(this.year, this.month + 1)

        this.setState({date});
    };

    handleSelectChange = () => {
        const year = this.yearSelect.value;
        const month = this.monthSelect.value;


        const date = new Date(year, month);
        console.log(date)
        this.setState({date});


    };

    handleDayClick = date => {
        console.log(date);
        this.setState({selectedDate: date});

        this.props.onChange(date);
    }

    render() {
        const {currentDate, selectedDate} = this.state;

        const monthData = calendarFunctions.getMonthData(this.year, this.month)

        const {years, monthNames, weekDayNames} = this.props;
        return (
            <div className='form calendar'>
                <div className='calendar__container'>
                    <div className='month'>
                        <div className='display__flex'>
                            <select
                                ref={elemement => this.monthSelect = elemement}
                                onChange={this.handleSelectChange}
                                value={this.month}
                                className='month__name'>{monthNames.map((name, index) =>
                                <option key={index} value={index}>{name}</option>)}
                            </select>
                            <select
                                ref={elemement => this.yearSelect = elemement}
                                onChange={this.handleSelectChange}
                                alue={this.year}
                                className='month__name'>{years.map(year =>
                                <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                        <div>
                            <button onClick={this.handlePrevButtonClick} className='month__button'> {'<'} </button>
                            <button onClick={this.handleNextButtonClick} className='month__button'> {'>'} </button>
                        </div>
                    </div>
                    <table>

                        <thead>
                        <tr className='week__day'>
                            {weekDayNames.map((name) => (
                                <th key={name} className="week__day__element head">
                                    {name}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {monthData.map((week, index) => (
                            <tr key={index} className="day__number">
                                {week.map((date, index) => date ?
                                    <td
                                        key={index}
                                        className={classNames('week__day__element', {
                                            ' today': calendarFunctions.areEqual(date, currentDate),
                                            ' selected': calendarFunctions.areEqual(date, selectedDate)
                                        })}
                                        onClick={() => this.handleDayClick(date)}
                                    >{date.getDate()}</td>
                                    :
                                    <td key={index}/>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


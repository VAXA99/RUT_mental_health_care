import React, {Component} from 'react';
import * as calendarFunctions from './calendarFunctions'
import classNames from 'classnames';
import consultation from "../../backend/Consultation";


export default class CalendarComponent extends Component {

    static defaultProps = {
        date: new Date(),
        years: [2023, 2024, 2025],
        monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        weekDayNames: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        onChange: Function.prototype
    };

    state = {
        date: this.props.date,
        currentDate: new Date(),
        selectedDate: null,
        schedule: []
    };

    get year() {
        return this.state.date.getFullYear();
    }

    get month() {
        return this.state.date.getMonth();
    }

    handlePrevButtonClick = async () => {
        const prevMonth = this.month - 1;
        const prevYear = prevMonth < 0 ? this.year - 1 : this.year;
        const date = new Date(prevYear, (prevMonth + 12) % 12);

        await this.fetchScheduleForMonth(date.getFullYear(), date.getMonth(), this.props.psychologistId);
        this.setState({ date });
    };

    handleNextButtonClick = async () => {
        const nextMonth = this.month + 1;
        const nextYear = nextMonth > 11 ? this.year + 1 : this.year;
        const date = new Date(nextYear, nextMonth % 12);

        await this.fetchScheduleForMonth(date.getFullYear(), date.getMonth(), this.props.psychologistId);
        this.setState({ date: date });
    };


    handleSelectChange = async () => {
        const year = Number(this.yearSelect.value);
        const month = Number(this.monthSelect.value);

        const date = new Date(Number(year), Number(month));
        this.setState({ date });

        // Fetch the schedule for the selected month
        await this.fetchScheduleForMonth(year, month, this.props.psychologistId);
    };


    handleDayClick = (date) => {
        this.setState({selectedDate: date});

        // Call the callback function passed from the parent component
        this.props.onDateSelect(date);
    };

    async componentDidMount() {
        // Call your backend API to get the schedule for the current month
        const { year, month } = this;
        const psychologistId = this.props.psychologistId;

        await this.fetchScheduleForMonth(year, month, psychologistId);
    }

    async fetchScheduleForMonth(year, month, psychologistId) {
        try {
            const schedule = await consultation.fetchScheduleForMonth(year, month+1, psychologistId);
            console.log(schedule);
            this.setState({ schedule });
        } catch (error) {
            // Handle the error as needed
        }
    }


    render() {
        const {currentDate, selectedDate, schedule} = this.state;

        const monthData = calendarFunctions.getMonthData(this.year, this.month)


        const consultationDates = schedule.map((item) =>
            new Date(item.startsAt).toLocaleDateString()
        );

        const {years, monthNames, weekDayNames} = this.props;
        return (
            <div className='form calendar'>
                <div className='calendar__container'>
                    <div className='month'>
                        <div className='display__flex'>
                            <select
                                ref={element => this.monthSelect = element}
                                onChange={this.handleSelectChange}
                                value={this.month}
                                className='month__name'>{monthNames.map((name, index) =>
                                <option key={index} value={index}>{name}</option>)}
                            </select>
                            <select
                                ref={element => this.yearSelect = element}
                                onChange={this.handleSelectChange}
                                value={this.year}
                                className='month__name'>{years.map(year =>
                                <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                        <div>
                            <button type={"button"} onClick={this.handlePrevButtonClick} className='month__button'> {'<'} </button>
                            <button type={"button"} onClick={this.handleNextButtonClick} className='month__button'> {'>'} </button>
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
                                {week.map((date, index) => {
                                    const formattedDate = date
                                        ? date.toLocaleDateString()
                                        : null;
                                    const hasConsultations = consultationDates.includes(
                                        formattedDate
                                    );
                                    return (
                                        <td
                                            key={index}
                                            className={classNames('week__day__element', {
                                                'today': calendarFunctions.areEqual(date, currentDate),
                                                'selected': calendarFunctions.areEqual(
                                                    date,
                                                    selectedDate
                                                ),
                                                'unavailable': !hasConsultations,
                                            })}
                                            onClick={hasConsultations ? () => this.handleDayClick(date) : null}
                                        >
                                            {date ? date.getDate() : ''}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
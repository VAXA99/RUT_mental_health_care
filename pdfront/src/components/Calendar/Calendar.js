import React, { useEffect, Component} from 'react'
import Header from '../Header/Header'
import { Link } from 'react-router-dom';
import CalendarComponent from './CalendarComponent';

import * as calendarFunctions from './calendarFunctions'
import Menu from '../Menu/Menu';




export default class Calendar extends Component {


    /*Рассчет вида календаря*/
    static defaultProps = {
        date: new Date(),
        years: [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030 ],
        monthNames:[ "Январь", "Февраль","Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        weekDayNames:["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
        onChange: Function.prototype
    };

    state={
        date: this.props.date,
        currentDate: new Date(), 
        selectedDate: null
    };

    get year(){
        return this.state.date.getFullYear();
    }

    get month(){
        return this.state.date.getMonth();
    }

    handlePrevButtonClick = () =>{
        const date = new Date(this.year, this.month - 1)
        
        this.setState({ date });
    };

    handleNextButtonClick = () =>{
        const date = new Date(this.year, this.month + 1)
       
        this.setState({date});
    };

    handleSelectChange = ()=>{
        const year = this.yearSelect.value;
        const month = this.monthSelect.value;

        
        const date = new Date(year, month);
        console.log(date)
        this.setState({ date});
        


    };

    handleDayClick= date =>{
        console.log(date);
        this.setState({selectedDate: date});

        this.props.onChange(date);
    }
/*Рассчет вида календаря*/
    render() {
    const {currentDate, selectedDate} = this.state;

    const monthData = calendarFunctions.getMonthData(this.year, this.month)

    const {years, monthNames, weekDayNames}=this.props;

      return (
    <>
    <Header/>
    <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
    <link href="https://fonts.cdnfonts.com/css/forma-djr-banner" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet"></link>
    <img className="angle top center" src="/img/Star%201.png" />
    <img className="angle right__home" src="/img/Ellipse 6.png" />
    
   
    
    <div className="display__flex__mt">
    <div className="container left">
    <Menu/>
    
    </div>
    <div className="container main calendar ">
    <div className="form__page__title">Запись на прием</div>
        <div className="form main forms">
            <div className='calendar__form__container'>
                <div className='display__flex__mt calendar'>
                    <div className='calendar__form__left'>
                        <div className='select__time'>
                            <div className="articles__form calendar">Выберите время и дату</div>
                        </div>
                        <div className='form__page__subtitle calendar'> информация о приеме будет выслана на вашу почту</div>
                        <div className='time__buttons'>
                                <button className='form time'>10:00</button>
                                <button className='form time'>12:00</button>
                                <button className='form time'>14:00</button>
                                <button className='form time'>16:00</button>
                        </div>
                        <div className="button calendar" >
                            <button className="next__step" >Записаться</button>
                        </div>
                    </div>
                    <CalendarComponent/>
                    
                </div>
            </div>
        </div>
    </div>

</div>

</>
    )
}
}

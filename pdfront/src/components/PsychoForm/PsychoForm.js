import React from 'react'
import Menu from '../Menu/Menu';
import "./psychoForm.css"
import Calendar from "../Calendar/Calendar";
import CalendarComponent from "../Calendar/CalendarComponent";


export default function PsychoForm() {

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
                    <table className="psycho__form__head">
                        <thead className="week__days">
                        <th></th>
                            <th>Пн</th>
                            <th>Вт</th>
                            <th>Ср</th>
                            <th>Чт</th>
                            <th>Пт</th>
                            <th>Сб</th>
                            <th>Вс</th>
                            <th></th>
                        </thead>
                        <tbody className="week__numbers">
                            <button type={"button"} className='month__button'>
                                <img src="/img/кнопка%20влево.png" alt="" width='80%'/>
                            </button>
                            <td className='week__numbers__element focus'>30</td>
                            <td className='week__numbers__element'>31</td>
                            <td className='week__numbers__element'>1</td>
                            <td className='week__numbers__element'>2</td>
                            <td className='week__numbers__element'>3</td>
                            <td className='week__numbers__element'>4</td>
                            <td className='week__numbers__element'>5</td>
                            <button type={"button"}  className='month__button'>
                                <img src="/img/кнопка%20вправо.png" alt=""  width='80%'/>
                            </button>
                        </tbody>
                    </table>
                    <div className="display__flex__mt">
                        <div className='sub__form__cont psycho__form'>
                            <div>
                                <div className='recording__row'>
                                    <div className='left__spans'>
                                        <div className='recording__number'>1</div>
                                        <div className='recording__time'>8:00-9:30</div>
                                    </div>
                                    <div className='recording__name'>Смирнов Алексей</div>
                                </div>
                                <div className='recording__row'>
                                    <div className='left__spans'>
                                        <div className='recording__number'>2</div>
                                        <div className='recording__time'>9:40-11:10</div>
                                    </div>
                                    <div className='recording__name'>Смирнов Алексей</div>
                                </div>
                                <div className='recording__row'>
                                    <div className='left__spans'>
                                        <div className='recording__number'>3</div>
                                        <div className='recording__time'>11:20-12:50</div>
                                    </div>
                                    <div className='recording__name'>Смирнов Алексей</div>
                                </div>
                                <div className='recording__row focus'>
                                    <div className='left__spans focus'>
                                        <div className='recording__number'>4</div>
                                        <div className='recording__time'>13:20-14:50</div>
                                    </div>
                                    <div className='recording__name'>Окно</div>
                                </div>
                                <div className='recording__row'>
                                    <div className='left__spans'>
                                        <div className='recording__number'>5</div>
                                        <div className='recording__time'>15:00-16:30</div>
                                    </div>
                                    <div className='recording__name'>Смирнов Алексей</div>
                                </div>
                            </div>
                        </div>
                        <CalendarComponent/>
                    </div>
                </div>

            </div>
        </>
    )
}
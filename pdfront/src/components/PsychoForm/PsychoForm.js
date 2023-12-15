import React, {useEffect, useState} from 'react'
import Header from '../Header/Header'
import {Link} from 'react-router-dom';
import Menu from '../Menu/Menu';
import "./psychoForm.css"
import RightForm from '../Right form/RightForm';
import TestingForm from '../TestingForm/TestingForm';
import Auth from "../../backend/Auth";


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
                        <th>Пн</th>
                            <th>Пн</th>
                            <th>Вт</th>
                            <th>Ср</th>
                            <th>Чт</th>
                            <th>Пт</th>
                            <th>Сб</th>
                            <th>Вс</th>
                        <th>Вс</th>
                        </thead>
                        <tbody className="week__numbers">
                        <button type={"button"} className='month__button'> {'<'} </button>
                            <td className='week__numbers__element'>30</td>
                            <td className='week__numbers__element'>31</td>
                            <td className='week__numbers__element'>1</td>
                            <td className='week__numbers__element'>2</td>
                            <td className='week__numbers__element'>3</td>
                            <td className='week__numbers__element'>4</td>
                            <td className='week__numbers__element'>5</td>
                        <button type={"button"}  className='month__button'> {'>'} </button>
                        </tbody>
                    </table>

                </div>

            </div>
        </>
    )
}
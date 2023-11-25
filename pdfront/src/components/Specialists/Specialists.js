import React from 'react'
import {Link} from "react-router-dom";
import Menu from '../Menu/Menu';
import RightForm from '../Right form/RightForm';

export function Specialists(){
    return (
        <>
        <img className="angle top center" src="/img/Star%201.png" />
        <img className="angle right__home" src="/img/Ellipse 6.png" />
           <div className="display__flex__mt">
                <div className="container left">
                <Menu/>
                </div>
                <div className="container main">
                    <div className="main__title">Наши специалисты</div>
                    <div className="specialists">
                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/Морозова%203.png" alt="" width="90%" height="100%"/>
                            <div className="spec__link"></div>
                        </a>
                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/Морозова%203.png" alt="" width="90%" height="100%"/>
                            <div className="spec__link"></div>
                        </a>
                        
                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/Морозова%203.png" alt="" width="90%" height="100%"/>
                            <div className="spec__link"></div>
                        </a>

                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/Морозова%203.png" alt="" width="90%" height="100%"/>
                            <div className="spec__link"></div>
                        </a>
                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/Морозова%202.png" alt="" width="90%" height="100%"/>
                            <div className="spec__info"></div>
                        </a>

                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/Морозова%203.png" alt="" width="90%" height="100%"/>
                            <div className="spec__link"></div>
                        </a>

                    </div>
                </div>
                <div className="container right">
                    <RightForm/>
                </div>
            </div>
        </>
    )
}

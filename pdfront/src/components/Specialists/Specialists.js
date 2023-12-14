import React from 'react'
import Menu from '../Menu/Menu';
import './specialists.css'
import RightForm from '../Right form/RightForm';

export function Specialists() {
    return (
        <>
            <img className="angle top center" src="/img/Star%201.png"/>
            <img className="angle right__home" src="/img/Ellipse 6.png"/>
            <div className="display__flex__mt">
                <div className="container left">
                    <Menu/>
                </div>
                <div className="container main">
                    <div className="main__title">Наши специалисты</div>
                    <div className="specialists">
                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/морозовабез.png" alt="" width="85%" height="90%"/>
                            <div className="spec__link img " >Морозова</div>
                            <div className="spec__link img middlename" >Мария</div>
                        </a>

                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/морозовабез.png" alt=""  width="85%" height="90%"/>
                            <div className="spec__link img" >Морозова</div>
                            <div className="spec__link img middlename" >Мария</div>
                        </a>
                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/мариябез.png" alt=""   width="85%" height="90%"/>
                            <div className="spec__link img" >Морозова</div>
                            <div className="spec__link img middlename" >Мария</div>
                        </a>
                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/мариябез.png" alt=""   width="85%" height="90%"/>
                            <div className="spec__link img" >Морозова</div>
                            <div className="spec__link img middlename" >Мария</div>
                        </a>

                        <a className="spec__element" href="/index.html">
                            <img className="spec__img" src="/img/морозовабез.png" alt=""  width="85%" height="90%"/>
                            <div className="spec__link img" >Морозова</div>
                            <div className="spec__link img middlename" >Мария</div>
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

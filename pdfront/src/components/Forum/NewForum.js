import Menu from "../Menu/Menu";
import './forum.css'
import React from "react";

export function NewForum() {
    return (
        <>
            <div className="display__flex__mt">
                <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                      rel="stylesheet"/>
                <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
                <img className="angle top center" src="/img/Star%201.png"/>
                <img className="angle right__home" src="/img/Ellipse 6.png"/>
                <div className="container left">
                    <Menu/>
                    <div className="form left">
                        <div className="form__title">Популярное</div>
                        <div className="form__main">
                            <div className="popular"><a href="/login.htm"># что то</a></div>
                            <div className="popular"><a href="/login.htm"># Как то</a></div>
                            <div className="popular"><a href="/login.htm"># Помощь</a></div>
                            <div className="popular"><a href="/login.htm"># Депрессия</a></div>
                            <div className="popular"><a href="/login.htm"># Заполнитель</a></div>
                        </div>
                    </div>
                </div>
                <div className="container main">
                    <div className="form main">
                        <div className="display__flex thread__flex">
                            <div className="form__theme">New Thread</div>
                        </div>

                    </div>
                    <div className="form main">
                        <div className="theme__container main__page">
                            <div className="display__flex">
                                <div className="theme__img"><img src="/img/меню__.png" width="100%" height="100%"
                                                                 alt=""/></div>
                                <div className="form__theme">VAXO009</div>
                            </div>
                            <textarea
                                name="textarea"
                                className="form__page__subtitle input forum__page title"
                                defaultValue={""}
                                placeholder={"Напишите заголовок, если нужно"}
                            ></textarea>
                            <br/>
                            <textarea
                                name="textarea"
                                className="form__page__subtitle input forum__page"
                                defaultValue={""}
                                placeholder={"Начните что думаете"}
                            ></textarea>
                        </div>
                    </div>
                    <div>
                        <div className="form__theme">Выберите теги</div>
                        <div className="theme__container main__page">
                            <div className="display__inline">
                                {[
                                    "Суицидальность",
                                    "Депрессия",
                                    "Утомляемость",
                                    "Проблемы на работе",
                                    "Проблемы в отношениях",
                                    "Перемены настрояния",
                                    "Потеря близкого человека",
                                    "Девиантное поведение",
                                    "Алкоголизм",
                                    "Перемены настрояния",
                                    "Потеря близкого человека",
                                ].map((problem, index) => (
                                    <div key={index} className="problem__button">
                                        <label>
                                            <input className='checkbox__none'
                                                   type="checkbox"
                                                   value={problem}
                                            />
                                            <div className="form info problem">{problem}</div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form__theme">Или напишите свои</div>
                        <textarea
                            name="textarea"
                            className="form__page__subtitle input forum__page new__forum"
                            defaultValue={""}
                            placeholder={"Напишите заголовок, если нужно"}
                        ></textarea>

                    </div>


                </div>
            </div>
        </>

    )
}

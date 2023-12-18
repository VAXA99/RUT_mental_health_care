import Menu from "../Menu/Menu";
import './articles.css'
import React from "react";
import RightForm from "../Right form/RightForm";


export function CreateArticle() {

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
                </div>
                <div className="container main">
                    <div className="form main">
                        <div className="display__flex thread__flex">
                            <div className="form__theme">Создание статьи</div>
                        </div>

                    </div>
                    <div className="form main">
                        <div className="theme__container main__page">
                            <textarea
                                name="textarea"
                                className="form__page__subtitle input forum__page title"
                                defaultValue={""}
                                placeholder={"Название статьи"}
                            ></textarea>
                            <br/>
                            <textarea
                                name="textarea"
                                className="form__page__subtitle input forum__page title"
                                defaultValue={""}
                                placeholder={"Поле заголовка"}
                            ></textarea>
                            <textarea
                                name="textarea"
                                className="form__page__subtitle input forum__page"
                                defaultValue={""}
                                placeholder={"Напишите что думаете"}
                            ></textarea>
                            <div className='display__flex__mt'>
                                <label className="input-file article">
                                    <input type="file" className="input-file article"/>
                                    <span className="input-file-btn article">Прикрепите обложку</span>
                                    {/*TODO изменить handleFileChange, добавить в него метод изменения ласт спан
                                    <div><span className="input-file-text">{fileName}}</span></div>*/}
                                    {/*<span className="input-file-text">Максимум 10мб</span>*/}
                                    {/* <span>Выберите файл</span>*/}

                                </label>
                            </div>
                        </div>

                    </div>
                    <div>


                    </div>
                    <button className="next__step thread__creation" type={"submit"} >
                        Создать
                    </button>

                </div>
                <div className="container right">
                    <RightForm/>
                </div>
            </div>
        </>

    )
}

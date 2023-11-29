import React, {Component, useState} from 'react'
import './popup.css'

export default function Popup(modalProps){

    const [modalState, setModalVisible] = useState(false);

    return (
        <>
            <div title="Close" onClick={() => modalProps.closeModal()} className="mask"></div>
            <form animationType="slide"
                  transparent={true}
                  visible={true}
                  className="form popup">
            <div className="popup__container">
                <div className="scroll">


                <button className="popup__button">Прочитать все</button>
                <div className="social__action">
                        <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%" height="100%"/>
                        <div className="popup__info">
                           <div className="popup__ttile">vaxo0099</div>
                           <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                        </div>
                </div>
                <div className="social__action">
                        <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%" height="100%"/>
                        <div className="popup__info">
                           <div className="popup__ttile">vaxo0099</div>
                           <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                        </div>
                </div>
                <div className="social__action">
                        <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%" height="100%"/>
                        <div className="popup__info">
                           <div className="popup__ttile">vaxo0099</div>
                           <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                        </div>
                </div>
                <div className="social__action">
                        <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%" height="100%"/>
                        <div className="popup__info">
                           <div className="popup__ttile">vaxo0099</div>
                           <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                        </div>
                </div>
                <div className="social__action">
                        <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%" height="100%"/>
                        <div className="popup__info">
                           <div className="popup__ttile">vaxo0099</div>
                           <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                        </div>
                </div>
                <div className="social__action">
                        <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%" height="100%"/>
                        <div className="popup__info">
                           <div className="popup__ttile">vaxo0099</div>
                           <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                        </div>
                </div>
                <div className="social__action">
                        <img className="popup__img" src="/img/Ellipse 439.png" alt="" width="100%" height="100%"/>
                        <div className="popup__info">
                           <div className="popup__ttile">vaxo0099</div>
                           <div className="popup__decription">поставил(а) лайк на ваш тред</div>
                        </div>
                </div>
            </div>
            </div>

        </form>
        </>
    )

}

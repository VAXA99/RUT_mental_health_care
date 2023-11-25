import './rightForm.css'


export default function RightForm(){
    return (
        
        <div className="form right">
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet"></link>
        
        <div className="info__block">
            <div className="info__block__title">
                Время работы
            </div>
            <div className="info__block__info">
                Понедельник - пятница <br/>
                с 10:00 до 16:30
            </div>
        </div>
        <div className="info__block">
            <div className="info__block__title">
                Адрес
            </div>
            <div className="info__block__info">
                Новосущевская, д. 18 
            </div>
        </div>
        <div className="info__block">
            <div className="info__block__title">
                Кабинеты
            </div>
            <div className="info__block__info">
                
                <br/><br/><br/><br/><br/>
            </div>
        </div>
        <div className="info__block">
            <div className="info__block__title">
               Наши соц сети
            </div>
            <div className="info__block__info media">
                <div className="media__content">
                   <img className="media__img first" src="/img/icons8-vk%201.png" alt="" width="100%" height="100%"/>
                    вконтакте
                </div>
                <div >
                <div className="media__content">
                   <img className="media__img" src="/img/3380451_telegram_communication_social%20media_message_icon%201.png" alt="" width="100%" height="100%"/>
                    телеграм
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

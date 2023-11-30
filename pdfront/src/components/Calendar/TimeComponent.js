import React, {useState} from "react";

export default function TimeComponent({ onTimeSelect }) {

    const [selectedTime, setSelectedTime] = useState(null);

    const handleTimeSelect = (time) => {
        console.log('Selected time: ', time);
        setSelectedTime(time);
        onTimeSelect(selectedTime); // Notify the parent component
    };

    return (
        <>
            <div className='time__buttons'>
                <button className='form time' onClick={() => handleTimeSelect("10:00")}>
                    10:00
                </button>
                <button className='form time' onClick={() => handleTimeSelect("12:00")}>
                    12:00
                </button>
                <button className='form time' onClick={() => handleTimeSelect("14:00")}>
                    14:00
                </button>
                <button className='form time' onClick={() => handleTimeSelect("16:00")}>
                    16:00
                </button>
            </div>
        </>
    )
}
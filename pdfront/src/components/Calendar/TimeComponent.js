import React from "react";

export default function TimeComponent({ onTimeChange }) {

    const handleTimeClick = (time) => {
        onTimeChange(time); // Invoke the callback function from props
    };

    return (
        <>
            <div className='time__buttons'>
                <button className='form time' onClick={() => handleTimeClick('10:00')}>
                    10:00
                </button>
                <button className='form time' onClick={() => handleTimeClick('12:00')}>
                    12:00
                </button>
                <button className='form time' onClick={() => handleTimeClick('14:00')}>
                    14:00
                </button>
                <button className='form time' onClick={() => handleTimeClick('16:00')}>
                    16:00
                </button>
            </div>
        </>
    )
}
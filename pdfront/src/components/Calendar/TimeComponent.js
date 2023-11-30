import React from 'react';

export default function TimeComponent({onTimeSelect}) {
    const handleTimeClick = (time) => {
        onTimeSelect(time);
    };

    return (
        <>
            <div className='time__buttons'>
                <button className='form time' type={"button"} onClick={() => handleTimeClick("10:00")}>
                    10:00
                </button>
                <button className='form time' type={"button"} onClick={() => handleTimeClick("12:00")}>
                    12:00
                </button>
                <button className='form time' type={"button"} onClick={() => handleTimeClick("14:00")}>
                    14:00
                </button>
                <button className='form time' type={"button"} onClick={() => handleTimeClick("16:00")}>
                    16:00
                </button>
            </div>
        </>
    );
}

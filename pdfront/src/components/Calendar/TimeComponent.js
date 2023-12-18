import React, { useEffect, useState } from 'react';
import { format } from 'date-fns-tz';
import consultation from "../../backend/Consultation";

export default function TimeComponent({ onTimeSelect, selectedDate, psychologistId }) {
    const [availableTimes, setAvailableTimes] = useState([]);
    const [consultations, setConsultations] = useState([]);
    const [pressedButton, setPressedButton] = useState(null);

    useEffect(() => {
        // Fetch available consultations for the selected date
        const fetchConsultations = async () => {
            const response = await consultation.getAllAvailable(selectedDate, psychologistId);
            setConsultations(response.data);
        };

        // Call the fetchConsultations function when selectedDate or psychologistId changes
        if (selectedDate && psychologistId) {
            fetchConsultations();
        }
    }, [selectedDate, psychologistId]);

    const handleTimeClick = (time) => {
        // Find the consultation corresponding to the selected time
        const selectedConsultation = consultations.find(
            (consultation) =>
                format(new Date(consultation.startsAt), 'HH:mm', { timeZone: 'Europe/Moscow' }) === time
        );

        console.log('selected consultation: ', selectedConsultation);

        // Check if the clicked time is available before calling onTimeSelect
        if (selectedConsultation) {
            setPressedButton(time);
            onTimeSelect(selectedConsultation);
        } else {
            // Optionally provide user feedback that the time is not available
            alert('This time slot is not available. Please choose another time.');
        }
    };

    return (
        <>
            <div className='time__buttons'>
                {['10:00', '12:00', '14:00', '16:00'].map((time) => {
                    // Find the consultation for the current time
                    const consultationForTime = consultations.find(
                        (consultation) =>
                            format(new Date(consultation.startsAt), 'HH:mm', { timeZone: 'Europe/Moscow' }) === time
                    );

                    return (
                        <button
                            key={time}
                            className={`form time${consultationForTime ? (pressedButton === time ? ' pressed' : '') : ' unavailable'}`}
                            type='button'
                            onClick={() => handleTimeClick(time)}
                            disabled={!consultationForTime}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>
        </>
    );
}

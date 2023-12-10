import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {format, utcToZonedTime} from 'date-fns-tz';
import baseUrl from '../../backend/base-url';

export default function TimeComponent({ onTimeSelect, selectedDate, psychologistId }) {
    const [availableTimes, setAvailableTimes] = useState([]);

    const [consultations, setConsultations] = useState([]);

    useEffect(() => {
        // Fetch available consultations for the selected date
        const fetchConsultations = async () => {
            try {
                const formattedDate = format(selectedDate, 'yyyy-MM-dd', { timeZone: 'Europe/Moscow' });
                const response = await axios.get(`${baseUrl}/consultations/allAvailable`, {
                    params: {
                        chosenDate: formattedDate,
                        psychologistId,
                    },
                });

                setConsultations(response.data);
            } catch (error) {
                console.error('Error fetching available consultations:', error);
            }
        };

        // Call the fetchConsultations function when selectedDate or psychologistId changes
        if (selectedDate && psychologistId) {
            fetchConsultations();
        }
    }, [selectedDate, psychologistId]);

    const handleTimeClick = (time) => {
        // Find the consultation corresponding to the selected time
        const selectedConsultation = consultations.find(
            (consultation) => format(new Date(consultation.startsAt), 'HH:mm', { timeZone: 'Europe/Moscow' }) === time
        );

        console.log("selected consultation: ", selectedConsultation);

        // Check if the clicked time is available before calling onTimeSelect
        if (selectedConsultation) {
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
                        (consultation) => format(new Date(consultation.startsAt), 'HH:mm', { timeZone: 'Europe/Moscow' }) === time
                    );

                    return (
                        <button
                            key={time}
                            className={`form time${consultationForTime ? '' : ' unavailable'}`}
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

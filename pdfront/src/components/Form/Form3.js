import React, {useEffect, useState} from 'react';
import {getPsychologistsProfiles, getUserProfilePhoto} from "../../backend/UserProfile";

export function Form3({onSubmit, initialData}) {
    const [psychologists, setPsychologists] = useState([]);
    const [selectedPsychologist, setSelectedPsychologist] = useState(initialData || null);
    console.log(selectedPsychologist);


    useEffect(() => {
        // Fetch psychologist profiles when the component mounts
        fetchPsychologists();
    }, []);

    const fetchPsychologists = async () => {
        try {
            const psychologistsData = await getPsychologistsProfiles();
            // Fetch profile pictures for psychologists
            const psychologistsWithPictures = await Promise.all(
                psychologistsData.map(async (psychologist) => {
                    const profilePicture = await getUserProfilePhoto(psychologist.username);
                    return {...psychologist, profilePicture};
                })
            );
            setPsychologists(psychologistsWithPictures);
        } catch (error) {
            console.error('Error fetching psychologists:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedPsychologist) {
            // Call the onSubmit callback with the selected psychologist data
            onSubmit(selectedPsychologist);
        } else {
            // Handle the case where no psychologist is selected
            console.error('No psychologist selected');
        }
    };

    const handlePsychologistSelect = (psychologist) => {
        console.log("selectedPsychologist:", psychologist);
        setSelectedPsychologist(psychologist);
    };

    return (
        <>
            <div className="container main calendar ">
                <div className="form__page__title">Запись на прием</div>
                <div className="form main forms">
                    <div className='calendar__form__container'>
                        <form onSubmit={handleSubmit}>
                            <div className='display__flex__mt calendar'>
                                <div className='sub__form__cont'>
                                    <div className='select__time'>
                                        <div className="articles__form calendar">Выберите специалиста</div>
                                    </div>
                                    <div className='form__page__subtitle calendar'>
                                        информация о приеме будет выслана на вашу почту
                                    </div>
                                    <div className="specialists checkbox">
                                        {psychologists.map((psychologist, index) => (
                                            <div className="spec__element checkbox "
                                                 key={index}
                                                 onClick={() => handlePsychologistSelect(psychologist)}>
                                                <img
                                                    className="spec__img checkbox"
                                                    src={psychologist.profilePicture.src}
                                                    alt=""
                                                    width="100%"
                                                    height="100%"
                                                />
                                                <div className="spec__link name">{`${psychologist.surname}`}</div>
                                                <div className="spec__link middlename"> {`${psychologist.name}`}</div>
                                                <input
                                                    type="radio"
                                                    name="psychologist"
                                                    checked={selectedPsychologist && selectedPsychologist.userId === psychologist.userId}
                                                    onChange={() => handlePsychologistSelect(psychologist)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="button calendar">
                            <button className="next__step" type={"submit"}>
                                    Следующий шаг
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

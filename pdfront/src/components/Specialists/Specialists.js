import React, {useEffect, useState} from 'react'
import Menu from '../Menu/Menu';
import './specialists.css'
import RightForm from '../Right form/RightForm';
import {getPsychologistsProfiles, getUserProfilePhoto} from "../../backend/UserProfile";

export function Specialists() {
    const [psychologists, setPsychologists] = useState([]);

    useEffect(() => {
        const fetchPsychologists = async () => {
            try {
                const psychologistsData = await getPsychologistsProfiles();
                // Fetch profile pictures for psychologists
                const psychologistsWithPictures = await Promise.all(
                    psychologistsData.map(async (psychologist) => {
                        const profilePicture = await getUserProfilePhoto(psychologist.userId);
                        return {...psychologist, profilePicture};
                    })
                );
                setPsychologists(psychologistsWithPictures);
            } catch (error) {
                console.error('Error fetching psychologists:', error);
            }
        };

        fetchPsychologists()
    }, []);


    return (
        <>
            <img className="angle top center" src="/img/Star%201.png"/>
            <img className="angle right__home" src="/img/Ellipse 6.png"/>
            <div className="display__flex__mt">
                <div className="container left">
                    <Menu/>
                </div>
                <div className="container main">
                    <div className="main__title">Наши специалисты</div>
                    <div className="specialists">
                        {psychologists.map((psychologist, index) => (
                            <div className="spec__element"
                                 key={index}>
                                <img
                                    className="spec__img"
                                    src={psychologist.profilePicture.src}
                                    alt=""
                                    width="85%"
                                    height="90%"
                                />
                                <div className="spec__link img">{`${psychologist.surname}`}</div>
                                <div className="spec__link middlename"> {`${psychologist.name}`}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="container right">
                    <RightForm/>
                </div>
            </div>
        </>
    )
}

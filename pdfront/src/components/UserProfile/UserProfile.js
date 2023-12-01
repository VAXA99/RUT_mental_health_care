import React, {useEffect, useState} from 'react';
import './userProfile.css'
import Header from "../Header/Header";
import Auth from "../../backend/Auth";
import {useNavigate} from "react-router-dom";
import {getUserProfile, getUserProfilePhoto, uploadUserProfilePicture} from "../../backend/UserProfile";


export default function UserProfile() {

    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const userId= Auth.getUserId();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleLogoutAndNavigate = () => {
        setAuthenticated(Auth.logout());

        navigate('/');
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleFileUpload = async () => {
        try {
            if (selectedFile) {
                await uploadUserProfilePicture(userId, selectedFile);
                // You may want to refresh the user profile picture after a successful upload
                const imgElement = await getUserProfilePhoto(userId);
                setUserProfilePicture(imgElement);
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };

    useEffect(() => {
        const fetchUserProfile = () => {
            getUserProfile(userId)
                .then((data) => {
                    setUserData(data);
                    console.log(data.age);
                })
                .catch((error) => {
                    // Handle error if needed
                    console.error('Error fetching user profile:', error);
                });
        };

        fetchUserProfile();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const tokenValid = Auth.isTokenValid();
            setAuthenticated(tokenValid);
            if (!tokenValid) {
                navigate("/auth")
            }
        }, 1000); // Check every second

        return () => {
            clearInterval(intervalId);
        };
    }, []);



    useEffect(() => {
        const fetchUserProfilePhoto = async () => {
            try {
                const imgElement = await getUserProfilePhoto(userId);
                setUserProfilePicture(imgElement);
            } catch (error) {
                console.error('Error fetching user profile photo:', error);
            }
        };

        fetchUserProfilePhoto();
    }, [userId]);

    return(

        <>
            <img className="angle top center" src="/img/Star%201.png" alt="Angle" />
            <img className="angle right__home" src="/img/Ellipse 6.png" alt="Ellipse" />
            <Header />
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet" />
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet" />
            <div className="container main profile">
                <div className="display__flex">
                    <div className="profile__photo">
                        {userProfilePicture && <img  className='profile__photo__img' height="100%" width="100%" src={userProfilePicture.src}/>}
                        {!userProfilePicture && <div>Loading...</div>}
                        <label className="input-file">
                            <input type="file" className="input-file" onChange={handleFileChange} />
                            <span>Выберите файл</span>
                        </label>
                        <button className="img__update__button" onClick={handleFileUpload}>Изменить фото</button>
                    </div>

                    <div className="profile__ifo">
                        <div className="edit__info">
                            <div className="main__title profile">
                                {userData.name} {userData.surname}
                                {userData.email}
                            </div>
                            <div className="margin__top">
                                <button className="nav__img profile">
                                    <img src="/img/Small FAB.png" alt="FAB" />
                                </button>
                            </div>
                        </div>
                        <div className="worker">студент</div>
                        <div className="profile__edit">
                            <div className="profile__edit__info">
                                <div className="profile__edit__title">Возраст</div>
                                <input className="profile__edit__input age" type="text" value={userData.age} placeholder="Возраст" readOnly />
                            </div>
                            <div className="profile__edit__info nickname">
                                <div className="profile__edit__title">Никнейм</div>
                                <input className="profile__edit__input nickname" type="text" value={userData.username} placeholder="Юзернейм" />
                            </div>
                        </div>
                        <div className="profile__edit">
                            <div className="profile__edit__info email">
                                <div className="profile__edit__title">Email</div>
                                <input className="profile__edit__input email" type="email" value={userData.email} placeholder="Емэил" />
                            </div>
                            <div className="profile__edit__info age">
                                <div className="profile__edit__title">Количество постов</div>
                                <input className="profile__edit__input age" type="text" value={userData.totalPosts} placeholder="---" />
                            </div>
                        </div>
                        <div className="profile__edit__info textarea">
                            <div className="profile__edit__title">Обо мне</div>
                            <div className="problems__input profile">
                                <textarea className="profile__edit__title" value={userData.bio} />
                            </div>
                        </div>
                        <button onClick={handleLogoutAndNavigate} className="nav__img profile">
                            <div className="display__flex">
                                <div className="log__out">Выйти из аккаунта</div>
                                <div>
                                    <img src="/img/Group 89.png" alt="Group 89" />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

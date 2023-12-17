import React, {useEffect, useState} from 'react';
import './userProfile.css'
import Auth from "../../backend/Auth";
import {useNavigate} from "react-router-dom";
import {getUserProfile, getUserProfilePhoto, uploadUserProfilePicture} from "../../backend/UserProfile";
import {useUserContext} from "../../UserProvider";


export default function UserProfileInfo() {

    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const userId= Auth.getUserId();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const { userProfilePicture, setUserProfilePicture } = useUserContext();

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

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };
    return(

        <>
            <div className="profile__info">
                <div className="edit__info">
                    <div className="main__title profile">
                        {userData.name} {userData.surname}
                        <div>
                            {userData.email}
                        </div>
                    </div>
                    <div className="edit__profile__info">
                        <button className="nav__img profile" onClick={togglePopup}>
                            <img src="/img/Small FAB.png" alt="FAB" />
                        </button>
                    </div>
                </div >
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
        </>
    )
}

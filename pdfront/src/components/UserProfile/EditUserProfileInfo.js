import React, {useEffect, useState} from 'react';
import './userProfile.css'
import Auth from "../../backend/Auth";
import {useNavigate} from "react-router-dom";
import {getUserProfile, getUserProfilePhoto, uploadUserProfilePicture} from "../../backend/UserProfile";
import {useUserContext} from "../../UserProvider";


export default function EditUserProfileInfo() {

    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const userId= Auth.getUserId();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);

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

    return(

        <>
                    <div className="profile__info edit">

                        <div className="worker">студент</div>
                        <div className="profile__edit first">
                            <div className="profile__edit__info edit">
                                <div className="profile__edit__title">Фамилия</div>
                                <input className="profile__edit__input edit" type="text"  placeholder={userData.surname} />
                            </div>
                            <div className="profile__edit__info edit">
                                <div className="profile__edit__title">Имя</div>
                                <input className="profile__edit__input edit" type="text" placeholder={userData.username} />
                            </div>
                            <div className="profile__edit__info edit">
                                <div className="profile__edit__title">Отчество</div>
                                <input className="profile__edit__input edit" type="text" placeholder={userData.age}   />
                            </div>
                        </div>
                        <div className="profile__edit">
                            <div className="profile__edit__info">
                                <div className="profile__edit__title">Дата рождения</div>
                                <input className="profile__edit__input edit" type="date" placeholder={userData.age}/>
                            </div>
                            <div className="profile__edit__info">
                                <div className="profile__edit__title">Никнейм</div>
                                <input className="profile__edit__input edit" type="text" placeholder={userData.age}  />
                            </div>
                        </div>
                        <div className="profile__edit">
                            <div className="profile__edit__info">
                                <div className="profile__edit__title">Почта</div>
                                <input className="profile__edit__input edit" type="email" placeholder={userData.email} />
                            </div>
                        </div>
                        <div className="profile__edit">
                            <div className="profile__edit__info">
                                <div className="profile__edit__title">Номер телефона</div>
                                <input className="profile__edit__input edit" type="text" placeholder={userData.totalPosts} />
                            </div>
                        </div>
                        <div className="profile__edit__info textarea">
                            <div className="profile__edit__title">Обо мне</div>
                            <div className="problems__input profile">
                                <textarea className="profile__edit__title" value={userData.bio} />
                            </div>
                        </div>
                        <button className="next__step">Применить изменения</button>
                    </div>
        </>
    )
}

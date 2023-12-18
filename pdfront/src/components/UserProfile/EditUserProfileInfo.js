import React, {useEffect, useState} from 'react';
import './userProfile.css'
import Auth from "../../backend/Auth";
import {getUserProfile, updateUserProfile} from "../../backend/UserProfile";


export default function EditUserProfileInfo({ toggleEditProfile }) {

    const username = Auth.getUsernameFromToken();
    const userId = Auth.getUserId();
    const [userData, setUserData] = useState({
        username: '',
        surname: '',
        middleName: '',
        phoneNumber: '',
        dateOfBirth: null,
        sex: null,
        email: '',
        bio: '',
    });

    useEffect(() => {
        const fetchUserProfile = () => {
            getUserProfile(username)
                .then((data) => {
                    setUserData(data);
                })
                .catch((error) => {
                    // Handle error if needed
                    console.error('Error fetching user profile:', error);
                });
        };
        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdateProfile = async () => {
        try {
            // Send the updated data to the server
            await updateUserProfile(userId, userData);
            toggleEditProfile();
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    return(

        <>
            <div className="profile__info edit">

                {userData.roles === "ROLE_STUDENT" ? (
                    <div className="worker">студент</div>

                ) : userData.roles === "ROLE_PSYCHOLOGIST" ? (
                    <div className="worker">психолог</div>
                ) : (
                    <div></div>
                )
                }
                <div className="profile__edit first">
                    <div className="profile__edit__info edit">
                        <div className="profile__edit__title">Фамилия</div>
                        <input className="profile__edit__input edit"
                               type="text"
                               name="surname"
                               placeholder={userData.surname}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="profile__edit__info edit">
                        <div className="profile__edit__title">Имя</div>
                        <input className="profile__edit__input edit"
                               type="text"
                               name="name"
                               onChange={handleChange}
                               placeholder={userData.name}/>
                    </div>
                    <div className="profile__edit__info edit">
                        <div className="profile__edit__title">Отчество</div>
                        <input className="profile__edit__input edit"
                               type="text"
                               name="middleName"
                               placeholder={userData.middleName}/>
                    </div>
                </div>
                <div className="profile__edit">
                    <div className="profile__edit__info">
                        <div className="profile__edit__title">Дата рождения</div>
                        <input className="profile__edit__input edit"
                               type="date"
                               name="dateOfBirth"
                               onChange={handleChange}
                               placeholder={userData.dateOfBirth}
                               max={(new Date(new Date().setFullYear(new Date().getFullYear() - 16))).toISOString().split('T')[0]}
                               value={userData.dateOfBirth}/>
                    </div>
                    <div className="profile__edit__info">
                        <div className="profile__edit__title">Никнейм</div>
                        <input className="profile__edit__input edit"
                               type="text"
                               name="username"
                               onChange={handleChange}
                               placeholder={userData.username}/>
                    </div>
                </div>
                <div className="profile__edit">
                    <div className="profile__edit__info">
                        <div className="profile__edit__title">Почта</div>
                        <input className="profile__edit__input edit"
                               type="email"
                               name="email"
                               onChange={handleChange}
                               placeholder={userData.email}/>
                    </div>
                </div>
                <div className="profile__edit">
                    <div className="profile__edit__info">
                        <div className="profile__edit__title">Номер телефона</div>
                        <input className="profile__edit__input edit"
                               type="text"
                               name="phoneNumber"
                               onChange={handleChange}
                               placeholder={userData.phoneNumber}/>
                    </div>
                </div>
                <div className="profile__edit">
                    <div className="profile__edit__title">Пол</div>
                    <select
                        className="profile__edit__input edit"
                        value={userData.sex}
                        onChange={handleChange}
                    >
                        <option value={1}>Мужчина</option>
                        <option value={2}>Женщина</option>
                    </select>
                </div>
                <div className="profile__edit__info textarea">
                <div className="profile__edit__title">Обо мне</div>
                    <div className="problems__input profile">
                        <textarea className="profile__edit__title"
                                  name="bio"
                                  onChange={handleChange}
                                  value={userData.bio}/>
                    </div>
                </div>
                <button
                    className="nav__img profile"
                    type="button"
                    onClick={toggleEditProfile}
                >
                    {/* You can customize the button for canceling or saving changes */}
                    <img src="/img/CancelIcon.png" alt="Cancel"/>
                </button>
                <button type="button" className="next__step" onClick={handleUpdateProfile}>Применить изменения</button>
            </div>
        </>
    )
}

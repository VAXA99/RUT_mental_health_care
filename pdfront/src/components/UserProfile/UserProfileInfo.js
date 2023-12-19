import React, {useEffect, useState} from 'react';
import './userProfile.css'
import Auth from "../../backend/Auth";
import {useNavigate, useParams} from "react-router-dom";
import {getUserProfile} from "../../backend/UserProfile";


export default function UserProfileInfo({toggleEditProfile}) {

    const [authenticated, setAuthenticated] = useState(Auth.isTokenValid);
    const scrollingUserUsername = Auth.getUsernameFromToken();
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const {username} = useParams();


    const handleLogoutAndNavigate = () => {
        setAuthenticated(Auth.logout());

        navigate('/');
    };

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
    }, [username]);


    return (

        <>
            <div className="profile__info">
                <div className="edit__info">
                    <div className="main__title profile">
                        {userData.name} {userData.surname} {userData.middleName}
                    </div>
                    {username === scrollingUserUsername &&
                        <div className="edit__profile__info">
                            <button
                                className="nav__img profile"
                                type="button"
                                onClick={toggleEditProfile}
                            >
                                <img src="/img/Small FAB.png" alt="FAB"/>
                            </button>
                        </div>}
                </div>
                {userData.roles === "ROLE_STUDENT" ? (
                    <div className="worker">студент</div>

                ) : userData.roles === "ROLE_PSYCHOLOGIST" ? (
                    <div className="worker">психолог</div>
                ) : (
                    <div></div>
                )
                }
                <div className="profile__edit">
                    <div className="profile__edit__info">
                        <div className="profile__edit__title">Возраст</div>
                        <input className="profile__edit__input age" type="text" value={userData.age}
                               placeholder="Возраст" readOnly/>
                    </div>
                    <div className="profile__edit__info nickname">
                        <div className="profile__edit__title">Никнейм</div>
                        <input className="profile__edit__input nickname" type="text" readOnly value={userData.username}
                               placeholder="Юзернейм"/>
                    </div>
                </div>
                <div className="profile__edit">
                    <div className="profile__edit__info email">
                        <div className="profile__edit__title">Email</div>
                        <input className="profile__edit__input email" type="email" readOnly value={userData.email}
                               placeholder="Емэил"/>
                    </div>
                </div>
                <div className="profile__edit__info age">
                    <div className="profile__edit__title">Количество постов</div>
                    <input className="profile__edit__input age" type="text" value={userData.totalPosts}
                           placeholder="---" readOnly/>
                </div>
                <div className="profile__edit__info age">
                    <div className="profile__edit__title">Количество комментариев</div>
                    <input className="profile__edit__input age" type="text" value={userData.totalComments}
                           placeholder="---" readOnly/>
                </div>
                <div className="profile__edit__info age">
                    <div className="profile__edit__title">Количество лайков</div>
                    <input className="profile__edit__input age" type="text" value={userData.totalLikes}
                           placeholder="---" readOnly/>
                </div>
                <div className="profile__edit__info textarea">
                    <div className="profile__edit__title">Обо мне</div>
                    <div className="problems__input profile">
                        <div className="profile__edit__title">{userData.bio}</div>
                    </div>
                </div>
                {/*{username === scrollingUserUsername &&*/}
                {/*    <button onClick={handleLogoutAndNavigate} className="nav__img profile">*/}
                {/*        <div className="display__flex">*/}
                {/*            <div className="log__out">Выйти из аккаунта</div>*/}
                {/*            <div>*/}
                {/*                <img src="/img/Group 89.png" alt="Group 89"/>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </button>*/}
                {/*}*/}
            </div>
        </>
    )
}

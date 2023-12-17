import React, {useEffect, useState} from 'react';
import './userProfile.css'
import Auth from "../../backend/Auth";
import {useNavigate} from "react-router-dom";
import {getUserProfile, getUserProfilePhoto, uploadUserProfilePicture} from "../../backend/UserProfile";
import {useUserContext} from "../../UserProvider";
import UserProfileInfo from "./UserProfileInfo";
import EditUserProfileInfo from "./EditUserProfileInfo";


export default function UserProfile() {

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
            <img className="angle top center" src="/img/Star%201.png" alt="Angle" />
            <img className="angle right__home" src="/img/Ellipse 6.png" alt="Ellipse" />
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet" />
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet" />
            <div className="container main profile">
                <div className="display__flex">
                    <div className="profile__photo">
                        {userProfilePicture && <img  className='profile__photo__img' height="100%" width="90%" src={userProfilePicture.src}/>}
                        {!userProfilePicture && <div>Loading...</div>}
                        <label className="input-file">
                            <input type="file" className="input-file" onChange={handleFileChange} />
                            <span className="input-file-btn">Выберите файл</span>
                            <div><span className="input-file-text">Максимум 10мб</span></div>
                            {/*TODO изменить handleFileChange, добавить в него метод изменения ласт спан
                             <div><span className="input-file-text">{fileName}}</span></div>*/}
                            {/*<span className="input-file-text">Максимум 10мб</span>*/}
                           {/* <span>Выберите файл</span>*/}

                        </label>
                        <button className="img__update__button" onClick={handleFileUpload}>Изменить фото</button>
                    </div>

                    <UserProfileInfo/>
                    {showPopup &&
                        <EditUserProfileInfo/>
                    }

                </div>
            </div>
        </>
    )
}

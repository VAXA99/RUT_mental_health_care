import React, {useEffect, useState} from 'react';
import './userProfile.css'
import Auth from "../../backend/Auth";
import {useParams} from "react-router-dom";
import {getUserProfilePhoto, uploadUserProfilePicture} from "../../backend/UserProfile";
import UserProfileInfo from "./UserProfileInfo";
import EditUserProfileInfo from "./EditUserProfileInfo";
import {useUserProfileContext} from "../../UserProvider";


export default function UserProfile() {

    const scrollingUserId = Auth.getUserId();
    const [selectedFile, setSelectedFile] = useState(null);
    const {username} = useParams();
    const scrollingUserUsername = Auth.getUsernameFromToken();
    const [isEditing, setIsEditing] = useState(false);
    const { userProfilePicture, setUserProfilePicture, setProfilePictureUpdated } = useUserProfileContext();
    const [fileName, setFileName] = useState('');



    const toggleEditProfile = () => {
        setIsEditing((prev) => !prev);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);

        // Update the filename
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('');
        }
    };

    const handleFileUpload = async () => {
        try {
            if (selectedFile) {
                await uploadUserProfilePicture(scrollingUserId, selectedFile);
                const imgElement = await getUserProfilePhoto(scrollingUserUsername);
                setUserProfilePicture(imgElement);
                setProfilePictureUpdated(true); // Set to true when the picture is updated
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
        }
    };


    useEffect(() => {
        const fetchUserProfilePhoto = async () => {
            try {
                const imgElement = await getUserProfilePhoto(username);
                setUserProfilePicture(imgElement);
                setProfilePictureUpdated(false);
            } catch (error) {
                console.error('Error fetching user profile photo:', error);
            }
        };

        fetchUserProfilePhoto();
    }, [username, setUserProfilePicture, setProfilePictureUpdated]);



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
                        {username === scrollingUserUsername &&
                            <div>
                                <label className="input-file">
                                    <input type="file" className="input-file" onChange={handleFileChange}/>
                                    <span className="input-file-btn">Выберите файл</span>
                                    <div><span className="input-file-text">Максимум 10мб</span></div>
                                    <div><span className="input-file-text">{fileName}</span></div>

                                </label>

                                <button className="img__update__button" onClick={handleFileUpload}>Изменить фото
                                </button>

                            </div>
                        }
                    </div>
                    {isEditing ? (
                        <EditUserProfileInfo toggleEditProfile={toggleEditProfile}/>
                    ) : (
                        <>
                            <UserProfileInfo toggleEditProfile={toggleEditProfile}/>

                        </>
                    )}
                </div>
            </div>
        </>
    )
}

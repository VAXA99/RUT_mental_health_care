// UserContext.js
import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();
const HeaderContext = createContext();

export const UserProfileProvider = ({ children }) => {
    const [userProfilePicture, setUserProfilePicture] = useState(null);
    const [profilePictureUpdated, setProfilePictureUpdated] = useState(true); // Initialize to true

    const contextValue = {
        userProfilePicture,
        setUserProfilePicture,
        profilePictureUpdated,
        setProfilePictureUpdated,
    };

    return (
        <UserProfileContext.Provider value={contextValue}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfileContext = () => useContext(UserProfileContext);

export const HeaderProvider = ({ children }) => {
    const [headerUserProfilePicture, setHeaderUserProfilePicture] = useState(null);

    const contextValue = {
        headerUserProfilePicture,
        setHeaderUserProfilePicture,
    };

    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeaderContext = () => useContext(HeaderContext);

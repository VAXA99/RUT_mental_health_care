import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userProfilePicture, setUserProfilePicture] = useState(null);

    return (
        <UserContext.Provider value={{ userProfilePicture, setUserProfilePicture }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};

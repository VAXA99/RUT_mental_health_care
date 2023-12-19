import axios from "axios";
import baseUrl from "./base-url";

let BASE_URL = baseUrl + '/profile';
const api = axios.create({
    baseURL: BASE_URL,
});

async function getUserProfile(username) {
    try {
        const response = await api.get(`/username/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error finding userID:', error);
        throw error;
    }
}

async function getUserProfilePhoto(username) {
    try {
        const response = await api.get(`/profilePicture/${username}`, {
            responseType: 'arraybuffer',
        });
        const imageData = response.data;

        // Create a Blob from the binary data
        const blob = new Blob([imageData]);

        // Create an object URL for the Blob
        const imageUrl = URL.createObjectURL(blob);

        // Display the image using the URL
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        return imgElement;

    } catch (error) {
        console.error('Error finding picture: ', error);
        return null;
    }
}

async function uploadUserProfilePicture(userId, selectedFile) {
    try {
        const longUserId = Number(userId);
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await api.post(`/uploadProfilePicture/${longUserId}`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        return response.data;
    } catch (error) {
        console.error('Failed to upload file: ', error)
        return null;
    }
}

async function getPsychologistsProfiles() {
    try {
        const response = await api.get(`/psychologistsProfiles`);
        return response.data;
    } catch (error) {
        console.error('Error fetching psychologists profiles:', error);
        return null;
    }
}

async function updateUserProfile(userId, userProfileRequest) {
    try {
        const response = await api.put(`/edit/${userId}`, userProfileRequest);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile: ', error);
        return null;
    }
}

export {
    getUserProfile,
    getUserProfilePhoto,
    uploadUserProfilePicture,
    getPsychologistsProfiles,
    updateUserProfile
};
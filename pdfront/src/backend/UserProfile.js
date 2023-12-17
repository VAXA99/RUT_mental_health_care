import axios from "axios";
import baseUrl from "./base-url";

let BASE_URL = baseUrl + '/profile';
const api = axios.create({
    baseURL: BASE_URL,
});

// Function to edit name by user ID
async function editName(userId, newName) {
    try {
        await api.patch(`/editName/${userId}?newName=${newName}`);
    } catch (error) {
        console.error('Error editing name:', error);
        throw error;
    }
}

// Function to edit surname by user ID
async function editSurname(userId, newSurname) {
    try {
        await api.patch(`/editSurname/${userId}?newSurname=${newSurname}`);
    } catch (error) {
        console.error('Error editing surname:', error);
        throw error;
    }
}

// Function to edit middle name by user ID
async function editMiddleName(userId, newMiddleName) {
    try {
        await api.patch(`/editMiddleName/${userId}`, {
            newMiddleName
        });
    } catch (error) {
        console.error('Error editing middle name:', error);
        throw error;
    }
}

// Function to edit email by user ID
async function editEmail(userId, newEmail) {
    try {
        await api.patch(`/editEmail/${userId}`, {
            newEmail
        });
    } catch (error) {
        console.error('Error editing email:', error);
        throw error;
    }
}

// Function to edit bio by user ID
async function editBio(userId, newBio) {
    try {
        await api.patch(`/editBio/${userId}`,{
            newBio
        });
    } catch (error) {
        console.error('Error editing bio:', error);
        throw error;
    }
}
async function getUserProfile(userID) {
    try {
        const longUserId = Number(userID);
        const response = await api.get(`/${longUserId}`);
        return response.data;
    } catch (error) {
        console.error('Error finding userID:', error);
        throw error;
    }
}

async function getUserProfilePhoto(userId) {
    try {
        const longUserId = Number(userId);
        const response = await api.get(`/profilePicture/${longUserId}`, {
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
        throw error;
    }
}

export {
    editName,
    editSurname,
    editMiddleName,
    editEmail,
    editBio,
    getUserProfile,
    getUserProfilePhoto,
    uploadUserProfilePicture,
    getPsychologistsProfiles
};
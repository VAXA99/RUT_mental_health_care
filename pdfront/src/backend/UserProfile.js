import axios from "axios";
import baseUrl from "./base-url";


// Function to edit name by user ID
async function editName(userId, newName) {
    try {
        await axios.patch(`${baseUrl}/profile/editName/${userId}?newName=${newName}`);
    } catch (error) {
        console.error('Error editing name:', error);
        throw error;
    }
}

// Function to edit surname by user ID
async function editSurname(userId, newSurname) {
    try {
        await axios.patch(`${baseUrl}/profile/editSurname/${userId}?newSurname=${newSurname}`);
    } catch (error) {
        console.error('Error editing surname:', error);
        throw error;
    }
}

// Function to edit middle name by user ID
async function editMiddleName(userId, newMiddleName) {
    try {
        await axios.patch(`${baseUrl}/profile/editMiddleName/${userId}`, {
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
        await axios.patch(`${baseUrl}/profile/editEmail/${userId}`, {
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
        await axios.patch(`${baseUrl}/profile/editBio/${userId}`,{
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
        const response = await axios.get(baseUrl + `/profile/${longUserId}`);
        return response.data;
    } catch (error) {
        console.error('Error find userID:', error);
        throw error;
    }
}

async function getUserProfilePhoto(userId) {
    try {
        const longUserId = Number(userId);
        const response = await axios.get(`${baseUrl}/profile/profilePicture/${longUserId}`, {
            responseType: 'arraybuffer',
        });
        const imageData = response.data;

        // Create a Blob from the binary data
        const blob = new Blob([imageData]);

        // Create an object URL for the Blob
        const imageUrl = URL.createObjectURL(blob);

        // Display the image using the URL
        const imgElement = document.createElement('img');
        console.log("Got picture")
        imgElement.src = imageUrl;
        return imgElement;

    } catch (error) {
        console.error('Error find picture: ', error);
        return null;
    }
}

async function uploadUserProfilePicture(userId, selectedFile) {
    try {
        const longUserId = Number(userId);
        const formData = new FormData();
        formData.append('file', selectedFile);
        const response = await axios.post(`${baseUrl}/profile/uploadProfilePicture/${longUserId}`,
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


export {
    editName,
    editSurname,
    editMiddleName,
    editEmail,
    editBio,
    getUserProfile,
    getUserProfilePhoto,
    uploadUserProfilePicture
};
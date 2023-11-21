import axios from "axios";
import baseUrl from "../base-url";


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
        await axios.patch(`${baseUrl}/profile/editMiddleName/${userId}?newMiddleName=${newMiddleName}`);
    } catch (error) {
        console.error('Error editing middle name:', error);
        throw error;
    }
}

// Function to edit email by user ID
async function editEmail(userId, newEmail) {
    try {
        await axios.patch(`${baseUrl}/profile/editEmail/${userId}?newEmail=${newEmail}`);
    } catch (error) {
        console.error('Error editing email:', error);
        throw error;
    }
}

// Function to edit bio by user ID
async function editBio(userId, newBio) {
    try {
        await axios.patch(`${baseUrl}/profile/editBio/${userId}?newBio=${newBio}`);
    } catch (error) {
        console.error('Error editing bio:', error);
        throw error;
    }
}

export {
    editName,
    editSurname,
    editMiddleName,
    editEmail,
    editBio,
};
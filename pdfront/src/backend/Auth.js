import {jwtDecode} from "jwt-decode";
import axios from "axios";
import baseUrl from "./base-url";

let BASE_URL = baseUrl + '/auth';
const api = axios.create({
    baseURL: BASE_URL,
});
export default {

    isTokenValid: () => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Token is not present
            return false;
        }

        try {
            // Decode the token to get its payload
            const decodedToken = jwtDecode(token);

            // Check the token's expiration time
            const currentTime = Date.now() / 1000; // Convert to seconds
            if (decodedToken.exp < currentTime) {
                // Token has expired
                return false;
            }

            // Additional checks based on your requirements can be added here

            // If all checks pass, the token is considered valid
            return true;
        } catch (error) {
            // An error occurred while decoding the token
            console.error('Error decoding token:', error);
            return false;
        }
    },

    signIn: async (username, password) => {
        try {
            const response = await api.post('/signIn', {
                username,
                password,
            });

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    signUp: async (email, username, password, name, surname, dateOfBirth, sex) => {
        try {
            const response = await api.post('/signUp', {
                email,
                username,
                password,
                name,
                surname,
                dateOfBirth,
                sex
            });
            return {success: response.status === 200, error: null};
        } catch (error) {
            console.error('Error on signUp: ', error);
            return {success: false, error: error.response ? error.response.data : 'Unknown error'};
        }
    },

    logout: async () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Set the authenticated state to false
        return false;
    },

    isUsernameValid: async (username) => {
        try {
            const response = await api.get('/exists_by_username',
                {
                    params: {
                        username: username
                    }
                });

            return response.status === 200;
        } catch (error) {
            console.error('Error checking username: ', error);
            return false;
        }
    },

    isEmailValid: async (email) => {
        try {
            const response = await api.get('/exists_by_email',
                {
                    params: {
                        email: email
                    }
                });
            return response.status === 200;
        } catch (error) {
            console.error('Error checking email: ', error);
            return false;
        }
    },

    getUserId: () => {
        try {
            return jwtDecode(localStorage.getItem('token')).userId;
        } catch (error) {
            return null;
        }

    },

    getUsernameFromToken: () => {
        try {
            return jwtDecode(localStorage.getItem('token')).sub;
        } catch (error) {
            return null;
        }
    },

    getUserRole: () => {
        try {
            return jwtDecode(localStorage.getItem('token')).roles;
        } catch (error) {
            return null;
        }
    }
}



import {jwtDecode} from "jwt-decode";
import axios from "axios";
import baseUrl from "./base-url";

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
            const response = await axios.post(baseUrl + '/auth/signIn', {
                username,
                password,
            });

            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    signUp: async (email, username, password, name, surname) => {
        try {
            const response = await axios.post({baseUrl} + '/auth/signUp', {
                email,
                username,
                password,
                name,
                surname
            });
            return response.status === 200;
        } catch (error) {
            console.error('Error on signUp: ', error);
            return false;
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
            const response = await axios.get({baseUrl} + '/auth/exists_by_username',
                {params: {
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
            const response = await axios.get({baseUrl} + '/auth/exists_by_email',
                {params: {
                    email: email
                    }
                });
            return response.status === 200;
        } catch (error) {
            console.error('Error checking email: ', error);
            return false;
        }
    },

    isUserIdValid: async () =>{
        const token = localStorage.getItem('token');

        if (!token) {
            // Token is not present
            return null;
        }

        try {
            // Decode the token to get its payload
            const decodedToken = jwtDecode(token);

            // Check the token's expiration time
            const currentTime = Date.now() / 1000; // Convert to seconds
            if (decodedToken.exp < currentTime) {
                // Token has expired
                return null;
            }

            // Additional checks based on your requirements can be added here

            // If all checks pass, the token is considered valid
            // Return userId along with other information
            return decodedToken.userId;
        } catch (error) {
            // An error occurred while decoding the token
            console.error('Error decoding token:', error);
            return null;
        }
    }




}



import {jwtDecode} from "jwt-decode";

const isTokenValid = () => {
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
};

export default isTokenValid;

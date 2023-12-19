import axios from "axios";
import baseUrl from "./base-url";

let BASE_URL = baseUrl + '/auth';
const api = axios.create({
    baseURL: BASE_URL,
});

export default {
    resetPassword: async (email) => {
        try {
            const response = await api.post('/user/resetPassword', { email });
            return response.data;
        } catch (error) {
            console.error("Error resetting password:", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    savePassword: async (token, newPassword) => {
        try {
            const response = await api.post('/user/savePassword', { token, newPassword });
            return response.data;
        } catch (error) {
            console.error("Error saving password:", error.response ? error.response.data : error.message);
            throw error;
        }
    }
}

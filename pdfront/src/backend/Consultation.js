import axios from "axios";
import baseUrl from "./base-url";

let BASE_URL = baseUrl + '/consultations';
const api = axios.create({
    baseURL: BASE_URL,
});

export default {

    getAvailableConsultationsForDate: async (chosenDate) => {
        try {
            const response = await api.get(`/allAvailable?chosenDate=${chosenDate}`);
            return {success: response.data, error: null};
        } catch (error) {
            console.error('Error getting consultations: ', error);
            return {success: false, error: error.response ? error.response.data : 'Unknown error'};
        }
    },

    formSubmission: async (data) => {
        try {
            const  response = await api.post('/setUp', {

            });
            return response.data;
        } catch (error) {
            console.error('Error submitting form: ', error);
            return false;
        }
    },

    getAllTags: async () => {
        try {
            const response = await api.get(`/getProblems`)
            return response.data;
        } catch (error) {
            console.error('Error getting tags: ', error);
            return false;
        }
    },

    fetchScheduleForMonth: async (year, month, psychologistId) => {
        try {
            const response = await api.get(
                `/getScheduleForMonth?year=${year}&month=${month}&psychologistId=${psychologistId}`
            );

            return response.data;
        } catch (error) {
            console.error('Error fetching schedule:', error);
            throw error; // Re-throw the error to handle it where the function is called
        }
    }

}
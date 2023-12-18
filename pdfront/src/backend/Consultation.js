import axios from "axios";
import baseUrl from "./base-url";
import {format} from "date-fns-tz";

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
            return false; // Re-throw the error to handle it where the function is called
        }
    },

    setUpConsultation: async (consultationId, consultationRequest) => {
        try {
            await api.post(`/setUp/${consultationId}`, consultationRequest);
        } catch (error) {
            console.error('Error setting up consultation: ', error);
            return false;
        }
    },

    getAllAvailable: async (chosenDate, psychologistId) => {
        try {
            const formattedDate = format(chosenDate, 'yyyy-MM-dd', { timeZone: 'Europe/Moscow' });
            return await axios.get(`${baseUrl}/consultations/allAvailable`, {
                params: {
                    chosenDate: formattedDate,
                    psychologistId,
                },
            });
        } catch (error) {
            console.error('Error fetching available consultations:', error);
        }
    },

    hasActiveConsultationSetUp: async (stringUserId) => {
        try {
            const userId = Number(stringUserId);
            const response = await api.get(`/hasActiveConsultationSetUp?userId=${userId}`);
        } catch (error) {
            console.error(error);
        }
    }

}
import axios from "axios";
import baseUrl from "./base-url";

export default {
    formSubmission: async (data) => {
        try {

            const  response = await axios.post(baseUrl + '/consultation/setUp', {
                data
            });
             return response.data;
        } catch (error) {
            console.error('Error submitting form: ', error);
            return false;
        }
    },

    getAvailableConsultationsForDate: async (chosenDate) => {
        try {
            const response = await axios.get(baseUrl + '/consultation/allAvailable',
                chosenDate
            );
            return response.data;
        } catch (error) {
            console.error('Error getting consultations: ', error);
            return false;
        }
    }
}
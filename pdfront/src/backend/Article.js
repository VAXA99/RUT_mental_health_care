import axios from "axios";
import baseUrl from "../base-url";


const validateStatus = status => (status >= 200 && status <= 300) || [500].includes(status);

export default {
    writeArticle: async(data) => {
        try {
            const response = await axios.post
        }
    }
}
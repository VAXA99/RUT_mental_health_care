import axios from "axios";
import baseUrl from "./base-url";


const BASE_URL = baseUrl + '/posts';
const api = axios.create({
    baseURL: BASE_URL,
});
export default {

    getFeed: async (userId) => {
        try {
            const response = await api.get(`/feed?scrollingUserId=${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error getting feed: ', error);
            return false;
        }
    },

    likePost: async (postId, userId, isLike) => {
        try {
            const response = await api.post(`/like/post/${postId}?userId=${userId}&isLike=${isLike}`);
            return response.data;
        } catch (error) {
            console.error('Error liking post from backend:', error);
            return false;
        }
    },

}
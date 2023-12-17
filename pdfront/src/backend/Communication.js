import axios from "axios";
import baseUrl from "./base-url";
import qs from "qs";


const BASE_URL = baseUrl + '/posts';
const api = axios.create({
    baseURL: BASE_URL,
});
export default {

    getFeed: async (scrollingUserId, feedType, tagNames) => {
        try {
            const response = await api.post(`/feed`, {
                scrollingUserId,
                feedType,
                tagNames,
            });
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

    writePost: async (postRequest) => {
        try {
            const response = await api.post(`/write`, postRequest);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

}
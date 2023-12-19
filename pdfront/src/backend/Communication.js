import axios from "axios";
import baseUrl from "./base-url";


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

    getPost: async (postId, scrollingUserId) => {
        try {
            const response = await api.get(`/post/${postId}?scrollingUserId=${scrollingUserId}`);
            return response.data;
        } catch (error) {
            console.error("Error getting post from backend", error);
        }
    },

    commentPost: async (postId, commentRequest) => {
        try {
            return await api.post(`/comment/post/${postId}`, commentRequest);
        } catch (error) {
            console.error("error commenting", error);
        }
    },

    getAllTags: async () => {
        try {
            const response = await api.get(`/allAvailableTags`)
            return response.data;
        } catch (error) {
            console.error('Error getting tags: ', error);
            return false;
        }
    },

    deleteThread: async (threadId) => {
        try {
            const response = await api.delete(`/delete/post/${threadId}`)
            return response.data;
        } catch (error) {
            console.error('Error deleting thread: ', error);
            return false;
        }
    },

    editThread: async (threadId, postRequest) => {
        try{
            const response = await api.patch(`/edit/post/${threadId}`, postRequest);
            return response.data;
        } catch (error) {
            console.error("Error editing post: ", error);
            return false;
        }
    }

}
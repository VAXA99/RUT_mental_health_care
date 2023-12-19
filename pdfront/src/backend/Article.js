import axios from "axios";
import baseUrl from "./base-url";

const BASE_URL = baseUrl + '/articles';
const api = axios.create({
    baseURL: BASE_URL,
});

const ArticleService = {
    getAllArticles: async () => {
        try {
            const response = await api.get();
            return response.data;
        } catch (error) {
            console.error('Error getting articles: ', error);
            throw error; // Propagate the error to the caller
        }
    },

    getArticle: async (articleId) => {
        try {
            const response = await api.get(`/${articleId}`);
            return response.data;
        } catch (error) {
            console.error(`Error getting article with ID ${articleId}: `, error);
            throw error;
        }
    },

    writeArticle: async (articleRequest) => {
        try {
            const response = await api.post('/write', articleRequest);
            return response.data;
        } catch (error) {
            console.error('Error writing article: ', error);
            throw error;
        }
    },

    editArticle: async (articleId, articleRequest) => {
        try {
            const response = await api.patch(`/edit/${articleId}`, articleRequest);
            return response.data;
        } catch (error) {
            console.error('Error editing article: ', error);
            throw error;
        }
    },

    deleteArticle: async (articleId) => {
        try {
            const response = await api.delete(`/delete/${articleId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting article: ', error);
            throw error;
        }
    },

   getArticlePicture: async (articleId) => {
        try {
            const response = await api.get(`/articlePicture/${articleId}`, {
                responseType: 'arraybuffer',
            });
            const imageData = response.data;

            // Create a Blob from the binary data
            const blob = new Blob([imageData]);

            // Create an object URL for the Blob
            const imageUrl = URL.createObjectURL(blob);

            // Display the image using the URL
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            return imgElement;

        } catch (error) {
            console.error('Error finding article picture: ', error);
            return null;
        }
    },

    uploadArticlePicture: async (articleId, selectedFile) => {
        try {
            const longArticleId = Number(articleId);
            const formData = new FormData();
            formData.append('file', selectedFile);
            const response = await api.post(`/uploadArticlePicture/${longArticleId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            return response.data;
        } catch (error) {
            console.error('Failed to upload article picture: ', error)
            return null;
        }
    }
};

export default ArticleService;

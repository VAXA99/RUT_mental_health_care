// ArticleDetails.js
import React, { useEffect, useState } from 'react';
import ArticleService from '../../backend/Article';

const ArticleDetails = ({ match }) => {
    const [article, setArticle] = useState(null);
    const [articlePicture, setArticlePicture] = useState(null);

    useEffect(() => {
        const fetchArticleDetails = async () => {
            try {
                const { params } = match;
                const articleId = params.id;

                // Fetch article details
                const fetchedArticle = await ArticleService.getArticle(articleId);
                setArticle(fetchedArticle);

                // Fetch article picture
                const imgElement = await ArticleService.getArticlePicture(articleId);
                setArticlePicture(imgElement);
            } catch (error) {
                console.error('Error fetching article details: ', error);
            }
        };

        fetchArticleDetails();
    }, [match]);

    if (!article) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {/* Display article details, title, content, and picture */}
            <h1>{article.title}</h1>
            <div>{article.content}</div>
            {articlePicture && <img src={articlePicture.src} alt="" />}
        </div>
    );
};

export default ArticleDetails;

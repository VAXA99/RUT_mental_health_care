// ArticleDetails.js
import React, {useEffect, useState} from 'react';
import ArticleService from '../../backend/Article';
import {useParams} from "react-router-dom";
import Menu from "../Menu/Menu";

const ArticleDetails = () => {
    const [article, setArticle] = useState(null);
    const [articlePicture, setArticlePicture] = useState(null);
    const {articleId} = useParams();


    useEffect(() => {
        const fetchArticleDetails = async () => {
            // Fetch article details
            const fetchedArticle = await ArticleService.getArticle(articleId);
            setArticle(fetchedArticle);

            // Fetch article picture
            const imgElement = await ArticleService.getArticlePicture(articleId);
            setArticlePicture(imgElement);

        };

        fetchArticleDetails();
    }, [articleId]);


    return (
        <div>
            {article &&
                <>
                    <h1>{article.title}</h1>
                    {articlePicture && <img height={"20%"} width={"30%"} src={articlePicture.src} alt=""/>}
                    <div>{article.content}</div>
                </>
            }
        </div>
    );
};

export default ArticleDetails;

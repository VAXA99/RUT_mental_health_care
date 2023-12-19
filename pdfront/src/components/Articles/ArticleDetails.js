// ArticleDetails.js
import React, {useEffect, useState} from 'react';
import ArticleService from '../../backend/Article';
import {Link, useParams} from "react-router-dom";
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

        <div className='display__flex'>
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                  rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
            <img className="angle top center" src="/img/Star%201.png"/>
            <img className="angle right__home" src="/img/Ellipse 6.png"/>
            <div className="container left">
                <Menu/>
            </div>
            <div className='container main'>
                <div className='article__detail'>
                    {article &&
                        <div className='form main article cont'>
                            <div>
                                <div className="img__position">
                                    {articlePicture && (
                                        <img
                                            src={articlePicture.src}
                                            alt=""
                                            width="100%"
                                            height="100%"
                                            className='article__img'
                                        />
                                    )}
                                </div>
                                <div className="form__page__title article" >
                                    {article.title}
                                </div>
                                <h3 className="theme__info main__page" >
                                    {article.content}
                                </h3>
                            </div>

                        </div>
                    }
                </div>

            </div>

        </div>
    );
};

export default ArticleDetails;

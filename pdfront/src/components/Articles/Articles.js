import React, { useEffect, useState } from 'react';
import './articles.css';
import Menu from '../Menu/Menu';
import RightForm from '../Right form/RightForm';
import { Link } from 'react-router-dom';
import ArticleService from "../../backend/Article";
import auth from "../../backend/Auth";

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [articlePictures, setArticlePictures] = useState({});
    const scrollingUserId = auth.getUserId();
    const userRole = auth.getUserRole();


    useEffect(() => {
        // Fetch articles when the component mounts
        const fetchArticles = async () => {
            try {
                const fetchedArticles = await ArticleService.getAllArticles();
                setArticles(fetchedArticles);
                console.log(fetchedArticles);
            } catch (error) {
                console.error('Error fetching articles: ', error);
            }
        };

        fetchArticles();
    }, []);

    useEffect(() => {
        const fetchArticlePicture = async (articleId) => {
            try {
                const imgElement = await ArticleService.getArticlePicture(articleId);
                setArticlePictures((prevArticlePictures) => ({
                    ...prevArticlePictures,
                    [articleId]: imgElement,
                }));
            } catch (error) {
                console.error('Error fetching article picture: ', error);
            }
        };

        // Fetch article picture for each article
        for (const article of articles) {
            const articleId = article.id;
            if (!articlePictures[articleId]) {
                fetchArticlePicture(articleId);
            }
        }
    }, [articles, articlePictures]);

    const handleDeleteClick = async (articleId) => {
        try {
            await ArticleService.deleteArticle(articleId);
            const updatedArticles = await ArticleService.getAllArticles();
            setArticles(updatedArticles);
        } catch (error) {
            console.error('Error deleting article: ', error);
        }
    };

    return (
        <>
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/forma-djr-banner" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                  rel="stylesheet"></link>
            <img className="angle top center" src="/img/Star%201.png"/>
            <img className="angle right__home" src="/img/Ellipse 6.png"/>


            <div className="display__flex__mt">
                <div className="container left">
                    <Menu/>

                </div>
                <div className="container main">
                    <div className="display__flex article">
                        <div className="articles__form">Статьи</div>
                        {userRole === "ROLE_PSYCHOLOGIST" &&
                            <Link to={'/create_article'} className="next__step article">
                                Создать
                            </Link>
                        }
                    </div>
                    {articles.map((article) => (
                        <div key={article.id} className="form main article">
                            <div className="img__position">
                                {articlePictures[article.id] && (
                                    <img
                                        src={articlePictures[article.id].src}
                                        alt=""
                                        width="100%"
                                        height="100%"
                                    />
                                )}
                            </div>
                            <div className="form__page__title">
                                <Link to={`/article/${article.id}`}>{article.title}</Link>
                            </div>
                            {userRole === "ROLE_PSYCHOLOGIST" && scrollingUserId === article.userDto.id &&
                            <>
                                <Link to={`/edit_article/${article.id}`} className="edit__link">
                                    Редактировать
                                </Link>

                                {/* Add the delete button */}
                                <button onClick={() => handleDeleteClick(article.id)} className="delete__button">
                                    Удалить
                                </button>
                            </>
                            }
                        </div>
                    ))}
                </div>
                <div className="container right">
                <RightForm/>
                </div>
            </div>
        </>
    )
}
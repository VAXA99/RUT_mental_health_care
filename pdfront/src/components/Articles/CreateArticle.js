import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import Menu from "../Menu/Menu";
import './articles.css';
import RightForm from "../Right form/RightForm";
import ArticleService from "../../backend/Article";
import auth from "../../backend/Auth";

export function CreateArticle() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [coverImage, setCoverImage] = useState(null);
    const navigate = useNavigate();
    const [fileName, setFileName] = useState('');


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCoverImage(file);

        // Update the filename
        if (file) {
            setFileName(file.name);
        } else {
            setFileName('');
        }
    };

    const handleCreateArticle = async () => {
        try {
            const articleRequest = {
                userId: auth.getUserId(),
                title: title,
                content: content,
            };

            const createdArticle = await ArticleService.writeArticle(articleRequest);

            if (createdArticle && coverImage) {
                try {
                    if (coverImage) {
                        await ArticleService.uploadArticlePicture(createdArticle, coverImage);
                    }
                } catch (error) {
                    console.error('Error uploading article picture:', error);
                }
            }

            navigate('/articles');  // Use navigate instead of history.push
        } catch (error) {
            console.error('Error creating article: ', error);
        }
    };

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap" rel="stylesheet"/>
            <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
            <img className="angle top center" src="/img/Star%201.png"/>
            <img className="angle right__home" src="/img/Ellipse 6.png"/>

            <div className="display__flex__mt">
                <div className="container left">
                    <Menu/>
                </div>
                <div className="container main">
                    <div className="form main">
                        <div className="display__flex thread__flex">
                            <div className="form__theme">Создание статьи</div>
                        </div>
                    </div>
                    <div className="form main">
                        <div className="theme__container main__page">
                            <textarea
                                name="title"
                                className="form__page__subtitle input forum__page title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={"Заголовок статьи"}
                            ></textarea>
                            <textarea
                                name="content"
                                className="form__page__subtitle input forum__page"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder={"Напишите что думаете"}
                            ></textarea>
                            <div className='display__flex__mt'>
                                <label className="input-file article">
                                    <input
                                        type="file"
                                        className="input-file article"
                                        onChange={handleFileChange}
                                    />
                                    <div><span className="input-file-text">{fileName}</span></div>
                                    <span className="input-file-btn article">Прикрепите обложку</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            className="next__step thread__creation"
                            type="submit"
                            onClick={handleCreateArticle}
                        >
                            Создать
                        </button>
                    </div>
                </div>
                <div className="container right">
                    <RightForm/>
                </div>
            </div>
        </>
    )
}

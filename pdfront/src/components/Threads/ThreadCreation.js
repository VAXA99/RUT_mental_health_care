import Menu from "../Menu/Menu";
import './forum.css'
import React, {useEffect, useState} from "react";
import consultation from "../../backend/Consultation";
import communication from "../../backend/Communication";
import auth from "../../backend/Auth";

export function ThreadCreation() {
    const [selectedProblems, setSelectedProblems] = useState([]);
    const [problemsFromBackend, setProblemsFromBackend] = useState([]);
    const [customTags, setCustomTags] = useState([]);
    const [currentTag, setCurrentTag] = useState('');
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        // Fetch problems from the backend when the component mounts
        const fetchProblems = async () => {
            try {
                // Assuming your backend API provides a function to get problems
                const problems = await consultation.getAllTags();
                setProblemsFromBackend(problems);
            } catch (error) {
                console.error("Error fetching problems from the backend", error);
            }
        };

        fetchProblems();
    }, []);

    const handleCheckboxChange = (problem) => {
        // Update the selected problems based on checkbox changes
        const updatedProblems = [...selectedProblems];
        const index = updatedProblems.indexOf(problem);

        if (index !== -1) {
            updatedProblems.splice(index, 1);
        } else {
            updatedProblems.push(problem);
        }

        setSelectedProblems(updatedProblems);
    };

    const handleTagInputChange = (event) => {
        setCurrentTag(event.target.value);
    };

    const handleTagInputKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); // Prevents the default behavior of adding a new line in the textarea

            if (currentTag.trim() !== '') {
                setCustomTags([...customTags, currentTag.trim()]);
                setCurrentTag('');
            }
        }
    };

    const handleTagDelete = (index) => {
        const updatedTags = [...customTags];
        updatedTags.splice(index, 1);
        setCustomTags(updatedTags);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const handleSubmit = async () => {
        try {
            const allTags = [...customTags, ...selectedProblems].map(tag =>
                capitalizeFirstLetter(tag.trim())
            );

            const postRequest = {
                userId: auth.getUserId(),
                title: title,
                content: content,
                tagNames: allTags,
            };

            console.log(postRequest);
            const response = await communication.writePost(postRequest);
            console.log(response); // Handle the response as needed
        } catch (error) {
            console.error('Error creating post', error); // Handle errors as needed
        }
    };


    return (
        <>
            <div className="display__flex__mt">
                <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@900&display=swap"
                      rel="stylesheet"/>
                <link href="https://fonts.cdnfonts.com/css/sf-pro-display" rel="stylesheet"/>
                <img className="angle top center" src="/img/Star%201.png"/>
                <img className="angle right__home" src="/img/Ellipse 6.png"/>
                <div className="container left">
                    <Menu/>
                </div>
                <div className="container main">
                    <div className="form main">
                        <div className="display__flex thread__flex">
                            <div className="form__theme">New Thread</div>
                        </div>

                    </div>
                    <div className="form main">
                        <div className="theme__container main__page">
                            <div className="display__flex">
                                <div className="theme__img"><img src="/img/меню__.png" width="100%" height="100%"
                                                                 alt=""/></div>
                                <div className="form__theme">VAXO009</div>
                            </div>
                            <textarea
                                name="textarea"
                                className="form__page__subtitle input forum__page title"
                                defaultValue={""}
                                onChange={handleTitleChange}
                                placeholder={"Напишите заголовок"}
                            ></textarea>
                            <br/>
                            <textarea
                                name="textarea"
                                className="form__page__subtitle input forum__page"
                                defaultValue={""}
                                onChange={handleContentChange}
                                placeholder={"Начните, что думаете"}
                            ></textarea>
                        </div>
                    </div>
                    <div>
                        <div className="form__theme">Выберите теги</div>
                        <div className="theme__container main__page">
                            <div className="display__inline">
                                {problemsFromBackend.map((problem, index) => (
                                    <button key={index} className="problem__button">
                                        <label>
                                            <input
                                                className="checkbox__none"
                                                type="checkbox"
                                                value={problem.description}
                                                onChange={() => handleCheckboxChange(problem.description)}
                                            />
                                            <div className="form info problem">{problem.description}</div>
                                        </label>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="form__theme">Или напишите свои</div>
                        <textarea
                            name="textarea"
                            className="form__page__subtitle input forum__page new__forum"
                            value={currentTag}
                            onChange={handleTagInputChange}
                            onKeyDown={handleTagInputKeyDown}
                            placeholder={"Тег добавится по ентеру или по пробелу"}
                        ></textarea>
                        <div className="tags-container">
                            {customTags.map((tag, index) => (
                                <div key={index} className="tag">
                                    {tag}
                                    <button
                                        type="button"
                                        className="tag-delete-button"
                                        onClick={() => handleTagDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="next__step thread__creation" type={"submit"} onClick={handleSubmit}>
                        Опубликовать
                    </button>

                </div>
            </div>
        </>

    )
}

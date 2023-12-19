import Menu from "../Menu/Menu";
import './forum.css'
import React, {useEffect, useState} from "react";
import {getUserProfilePhoto} from "../../backend/UserProfile";
import communication from "../../backend/Communication";
import {Link} from "react-router-dom";
import auth from "../../backend/Auth";
import consultation from "../../backend/Consultation";

export function ThreadFeed() {
    const [postsWithPopup, setPostsWithPopup] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [posts, setPosts] = useState([]);
    const [sortType, setSortType] = useState("NEWEST_TO_OLDEST");
    const [userProfilePictures, setUserProfilePictures] = useState({});
    const [problemsFromBackend, setProblemsFromBackend] = useState([]);
    const [selectedProblems, setSelectedProblems] = useState([]);
    const scrollingUserID = auth.getUserId();


    useEffect(() => {
        // Fetch problems from the backend when the component mounts
        const fetchProblems = async () => {
            // Assuming your backend API provides a function to get problems
            const problems = await communication.getAllTags();
            setProblemsFromBackend(problems);
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

    const handleSort = async (newSortType) => {
        const scrollingUerId = auth.getUserId();

        // Update the sort type state
        setSortType(newSortType);


        // Make the request to get the feed based on the updated sort type
        const data = await communication.getFeed(scrollingUerId, newSortType, []);
        setPosts(data);

    };

    const handleSearch = async (tagNames, newFeedType) => {
        const scrollingUerId = auth.getUserId();

        // Make the request to get the feed based on the updated sort type and tags
        const data = await communication.getFeed(scrollingUerId, newFeedType, tagNames);
        setPosts(data);
    };
    const togglePopup = (postId) => {
        setPostsWithPopup((prevPostsWithPopup) => ({
            ...prevPostsWithPopup,
            [postId]: !prevPostsWithPopup[postId],
        }));
    };


    useEffect(() => {
        const fetchPosts = async () => {
            const scrollingUerId = auth.getUserId();

            // Make the initial request to get the feed with the default sort type
            const data = await communication.getFeed(scrollingUerId, sortType, []);
            setPosts(data);
        };

        fetchPosts();
    }, [sortType, scrollingUserID]);


    useEffect(() => {
        const fetchUserProfilePhoto = async (username) => {
            const imgElement = await getUserProfilePhoto(username);
            setUserProfilePictures((prevProfilePictures) => ({
                ...prevProfilePictures,
                [username]: imgElement,
            }));
        };

        // Fetch user profile picture for each post
        for (const post of posts) {
            const username = post.userDto.username;
            if (!userProfilePictures[username]) {
                fetchUserProfilePhoto(username);
            }
        }
    }, [posts, userProfilePictures]);

    const handleLike = async (postId) => {
        try {
            const userId = auth.getUserId();

            // Determine the new like status
            const isLike = !posts.find((post) => post.id === postId).scrollingUserHasLiked;

            // Call the likePost API
            await communication.likePost(postId, userId, isLike);

            // Update the state to reflect the new like status
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId
                        ? {
                            ...post,
                            scrollingUserHasLiked: isLike,
                            likeCount: isLike ? post.likeCount + 1 : post.likeCount - 1,
                        }
                        : post
                )
            );
        } catch (error) {
            console.error("Error liking post:", error);
        }
    };

    const handleDelete = async (postId) => {
        try {
            // Call the deletePost API
            await communication.deleteThread(postId);

            // Update the state to remove the deleted post
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
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
                            <div className="form__theme">threads</div>
                            <div className="form__block__link thread">
                                <Link to={'/thread_creation'}>Создать тред</Link>
                            </div>

                        </div>
                    </div>
                    <div className="form main form__left">

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
                            <button className='border__none input__search' type="button"
                                    onClick={() => handleSearch(selectedProblems, "BY_TAGS")}>
                                <img src="/img/Search%20icon.png" width='25%'/>

                            </button>
                        </div>
                    </div>
                    <button className="next__step threads" onClick={() => handleSort("NEWEST_TO_OLDEST")}>
                        Отсортировать от новго к старому
                    </button>
                    <button className="next__step threads" onClick={() => handleSort("MOST_POPULAR_TO_LEAST")}>
                        Отсротировать по популярности
                    </button>
                    {posts.map((post) => (
                        <div key={post.id} className="form main">
                            <div className="theme__container main__page">
                                <div className="display__flex">
                                    {userProfilePictures[post.userDto.username] && (
                                        <div className="theme__img">
                                            <img
                                                src={userProfilePictures[post.userDto.username].src}
                                                width="100%"
                                                height="100%"
                                            />
                                        </div>
                                    )}
                                    <div className="form__theme">{post.userDto.username}</div>
                                </div>
                                <div className="theme__title">{post.title}</div>
                                <div className="theme__info main__page">{post.content}</div>
                                <div className="action__button">
                                    <Link to={`/thread/${post.id}`} className="action__button__element">
                                        <img src="/img/icons8-заполненная-тема-96 1.png" width="110%" height="110%"
                                             alt=""/>
                                    </Link>
                                    <div className="like__count">{post.commentCount}</div>
                                    <button type={"button"} className="action__button__element"
                                            onClick={() => handleLike(post.id, !post.isLiked)}>
                                        <img src="/img/Vector.png" width="90%" height="90%" alt=""/>
                                    </button>
                                    <div className="like__count">{post.likeCount}</div>
                                </div>
                            </div>
                            {scrollingUserID === post.userDto.id ? (
                                <>
                                    <button className='edit__img__container' onClick={() => togglePopup(post.id)}>
                                        <img src="/img/троеточие.png" alt="" width='100%' height='100%'/>
                                    </button>
                                    {postsWithPopup[post.id] && (
                                        <div className='parametr__buttons__container'>
                                            <div>
                                                <button type={"button"} className='post'>
                                                    <Link to={`/edit_thread/${post.id}`}>Изменить</Link>
                                                </button>
                                            </div>
                                            <div>
                                                <button type={"button"} className='post delete' onClick={() => handleDelete(post.id)}>
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            ) : (<></>)}
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

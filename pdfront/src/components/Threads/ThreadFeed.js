import Menu from "../Menu/Menu";
import './forum.css'
import React, {useEffect, useState} from "react";
import {getUserProfilePhoto} from "../../backend/UserProfile";
import communication from "../../backend/Communication";
import {Link} from "react-router-dom";
import auth from "../../backend/Auth";
import consultation from "../../backend/Consultation";

export function ThreadFeed() {

    const [posts, setPosts] = useState([]);
    const [sortType, setSortType] = useState("NEWEST_TO_OLDEST");
    const [userProfilePictures, setUserProfilePictures] = useState({});
    const [problemsFromBackend, setProblemsFromBackend] = useState([]);
    const [selectedProblems, setSelectedProblems] = useState([]);


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

    const handleSort = async (newSortType) => {
        try {
            const scrollingUerId = auth.getUserId();

            // Update the sort type state
            setSortType(newSortType);


            // Make the request to get the feed based on the updated sort type
            const data = await communication.getFeed(scrollingUerId, newSortType, []);
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts from the backend", error);
        }
    };

    const handleSearch = async (tagNames, newFeedType) => {
        try {
            const scrollingUerId = auth.getUserId();

            // Make the request to get the feed based on the updated sort type and tags
            const data = await communication.getFeed(scrollingUerId, newFeedType, tagNames);
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts from the backend", error);
        }
    };


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const scrollingUerId = auth.getUserId();

                // Make the initial request to get the feed with the default sort type
                const data = await communication.getFeed(scrollingUerId, sortType, []);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts from the backend", error);
            }
        };

        fetchPosts();
    }, [sortType]);


    useEffect(() => {
        const fetchUserProfilePhoto = async (userId) => {
            try {
                const imgElement = await getUserProfilePhoto(userId);
                setUserProfilePictures((prevProfilePictures) => ({
                    ...prevProfilePictures,
                    [userId]: imgElement,
                }));
            } catch (error) {
                console.error('Error fetching user profile photo:', error);
            }
        };

        // Fetch user profile picture for each post
        for (const post of posts) {
            const userId = post.userDto.id;
            if (!userProfilePictures[userId]) {
                fetchUserProfilePhoto(userId);
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
                            <button type="button" onClick={() => handleSearch(selectedProblems, "BY_TAGS")}>
                                {/*<img src="../../../public/img/Search%20icon.png"/>*/}
                                Поиск
                            </button>
                        </div>
                    </div>
                    <button onClick={() => handleSort("NEWEST_TO_OLDEST")}>
                        Sort by Newest to Oldest
                    </button>
                    <button onClick={() => handleSort("MOST_POPULAR_TO_LEAST")}>
                        Sort by Most Popular to Least
                    </button>
                    {posts.map((post) => (
                        <div key={post.id} className="form main">
                            <div className="theme__container main__page">
                                <div className="display__flex">
                                    {userProfilePictures[post.userDto.id] && (
                                        <div className="theme__img">
                                            <img
                                                src={userProfilePictures[post.userDto.id].src}
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
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}

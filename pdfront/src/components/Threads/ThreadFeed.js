import Menu from "../Menu/Menu";
import './forum.css'
import React, {useEffect, useState} from "react";
import {getUserProfilePhoto} from "../../backend/UserProfile";
import communication from "../../backend/Communication";
import {Link} from "react-router-dom";
import auth from "../../backend/Auth";
import Select from "react-select/base";

export function ThreadFeed() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const userId = auth.getUserId();
                const data = await communication.getFeed(userId);
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts from the backend", error);
            }
        };

        fetchPosts();
    }, []);

    const [userProfilePictures, setUserProfilePictures] = useState({});

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

    const handleLike = async (postId, isLike) => {
        try {
            const userId = auth.getUserId();

            // Call the likePost API
            await communication.likePost(postId, userId, isLike);

            // Update the state to reflect the like status
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.id === postId
                        ? { ...post, isLiked: isLike, likeCount: isLike ? post.likeCount + 1 : post.likeCount - 1 }
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
                    <div className="form left">
                        <div className="form__title">Популярное</div>
                        <div className="form__main">
                            <div className="popular"><a href="/login.htm"># что то</a></div>
                            <div className="popular"><a href="/login.htm"># Как то</a></div>
                            <div className="popular"><a href="/login.htm"># Помощь</a></div>
                            <div className="popular"><a href="/login.htm"># Депрессия</a></div>
                            <div className="popular"><a href="/login.htm"># Заполнитель</a></div>
                        </div>
                    </div>
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
                            {[
                                "Суицидальность",
                                "Депрессия",
                                "Утомляемость",
                                "Проблемы на работе",
                                "Проблемы в отношениях",
                                "Перемены настрояния",
                                "Потеря близкого человека",
                                "Девиантное поведение",
                                "Алкоголизм",
                                "Перемены настрояния",
                                "Потеря близкого человека",
                            ].map((problem, index) => (
                                <button key={index} className="problem__button">
                                    <label>
                                        <input className='checkbox__none'
                                               type="checkbox"
                                               value={problem}
                                        />
                                        <div className="form info problem">{problem}</div>
                                    </label>
                                </button>
                            ))}
                        </div>
                    </div>
                    {posts.map((post) => (
                        <div key={post.id} className="form main">
                            <div className="theme__container main__page">
                                <div className="display__flex">
                                    {/* Displaying user profile picture */}
                                    {userProfilePictures[post.userDto.id] && (
                                        <div className="theme__img">
                                            {/* Displaying user profile picture */}
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
                                    <button className="action__button__element">
                                        <img src="/img/icons8-заполненная-тема-96 1.png" width="110%" height="110%"
                                             alt=""/>
                                    </button>
                                    <div className="like__count">{post.commentCount}</div>
                                    <button type={"button"} className="action__button__element" onClick={() => handleLike(post.id, !post.isLiked)}>
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

import Menu from "../Menu/Menu";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import communication from "../../backend/Communication";
import auth from "../../backend/Auth";
import {getUserProfilePhoto} from "../../backend/UserProfile";

export function Comms() {
    const {postId} = useParams();
    const [post, setPost] = useState(null);
    const [userProfilePictures, setUserProfilePictures] = useState({});
    const scrollingUserId = auth.getUserId();
    const scrollingUsername = auth.getUsernameFromToken();
    const [commentContent, setCommentContent] = useState("");
    const [comments, setComments] = useState([]);
    const [commentsWithPopup, setCommentsWithPopup] = useState({});
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState("");

    const startEditingComment = (commentId, content) => {
        setEditingCommentId(commentId);
        setEditedCommentContent(content);
    };

    // Function to cancel editing a comment
    const cancelEditingComment = () => {
        setEditingCommentId(null);
        setEditedCommentContent("");
    };

    useEffect(() => {
        // Load existing comments when the component mounts
        if (post && post.commentDtos) {
            setComments(post.commentDtos);
        }
    }, [post]);

    const handleCommentSubmit = async () => {
        try {
            // Make sure there is content before submitting the comment
            if (commentContent.trim() === "") {
                return;
            }

            const response = await communication.commentPost(postId, {
                userId: scrollingUserId,
                content: commentContent,
            });

            // Comment added successfully, update the UI
            const newComment = {
                id: response.data.commentId, // Replace with the actual ID from the response
                userDto: {id: scrollingUserId, username: scrollingUsername}, // You may need to fetch user data
                content: commentContent,
                createdAt: new Date().toISOString(), // Add the creation timestamp
            };

            // Assign a key to the newly added comment
            newComment.key = response.data.commentId; // Use a unique identifier for the key

            setComments((prevComments) => [...prevComments, newComment]);
            setCommentContent(""); // Reset comment input

        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const togglePopup = (commentId) => {
        setCommentsWithPopup((prevCommentsWithPopup) => ({
            ...prevCommentsWithPopup,
            [commentId]: !prevCommentsWithPopup[commentId],
        }));
    };

    useEffect(() => {
        const fetchPost = async () => {
            const userId = auth.getUserId();
            const data = await communication.getPost(postId, userId);
            console.log(data);
            setPost(data);
        }
        fetchPost();
    }, [postId]);

    useEffect(() => {
        const fetchUserProfilePhoto = async (username) => {
            try {
                const imgElement = await getUserProfilePhoto(username);
                setUserProfilePictures((prevProfilePictures) => ({
                    ...prevProfilePictures,
                    [username]: imgElement,
                }));
            } catch (error) {
                console.error("Error fetching user profile photo:", error);
            }
        };

        // Fetch user profile picture for the post owner
        if (post && post.userDto) {
            const username = post.userDto.username;
            if (!userProfilePictures[username]) {
                fetchUserProfilePhoto(username);
            }
        }

        // Fetch user profile pictures for comments
        if (post && post.commentDtos) {
            for (const comment of post.commentDtos) {
                const username = comment.userDto.username;
                if (!userProfilePictures[username]) {
                    fetchUserProfilePhoto(username);
                }
            }
        }
    }, [post, userProfilePictures]);

    const handleDelete = async (commentId) => {
        try {
            // Call the deletePost API
            await communication.deleteComment(commentId);

            // Update the state to remove the deleted post
            setComments((prevComments) => prevComments.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const submitEditedComment = async (commentId) => {
        try {
            // Make sure there is content before submitting the edited comment
            if (editedCommentContent.trim() === "") {
                return;
            }

            const commentRequest = {
                userId: scrollingUserId,
                content: editedCommentContent,
            }

            // Call the API to update the comment content
            await communication.editComment(commentId, commentRequest);

            // Update the UI to reflect the edited comment
            setComments((prevComments) =>
                prevComments.map((comment) =>
                    comment.id === commentId
                        ? {...comment, content: editedCommentContent}
                        : comment
                )
            );

            // Reset editing state
            setEditingCommentId(null);
            setEditedCommentContent("");
        } catch (error) {
            console.error("Error editing comment:", error);
        }
    };

    return (
        <>
            {post && (
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
                        {/* Post Section */}
                        <div className="form main">
                            <div className="display__flex">
                                <div className="form__theme">thread</div>
                                <div className="form__subtitle">{post.tagNames && post.tagNames.map((tag, index) => (
                                    <span key={index}>#{tag}</span>
                                ))}</div>
                            </div>
                            <div className="display__flex">
                                <div className="form__owner">Создано: {post.userDto.username}</div>
                                <div className="form__date">{post.createdAt && (
                                    <>
                                        <div>{new Date(post.createdAt).toLocaleDateString()}</div>
                                        <div>{new Date(post.createdAt).toLocaleTimeString()}</div>
                                    </>
                                )}</div>
                            </div>
                        </div>
                        <div className="form main">
                            <div className="theme__container">
                                <div className="display__flex">
                                    {userProfilePictures[post.userDto.username] && (
                                        <div className="theme__img">
                                            <img src={userProfilePictures[post.userDto.username].src} width="100%"
                                                 height="100%" alt=""/>
                                        </div>
                                    )}
                                    <div className="form__theme">{post.userDto.username}</div>
                                </div>
                                <div className="theme__title">{post.title}</div>
                                <div className="theme__info">{post.content}</div>
                                <div className="action__button">
                                    {/*<button className="action__button__element">*/}
                                    {/*    <img src="/img/icons8-заполненная-тема-96 1.png" width="110%" height="110%"/>*/}
                                    {/*</button>*/}
                                    {/*<button className="action__button__element"*/}
                                    {/*        onClick={() => handleLike(post.id, !post.isLiked)}>*/}
                                    {/*<img src="/img/Vector.png" width="90%" height="90%"/>*/}
                                    {/*</button>*/}
                                    {/*<div className="like__count">{post.likeCount}</div>*/}
                                </div>
                            </div>
                        </div>

                        {/* Comments Section */}
                        {comments.map((comment) => (
                            <div key={comment.id} className="form main">
                                <div className="theme__container main__page">
                                    <div className="display__flex">
                                        {userProfilePictures[comment.userDto.username] && (
                                            <div className="theme__img">
                                                <img src={userProfilePictures[comment.userDto.username].src}
                                                     width="100%"
                                                     height="100%" alt=""/>
                                            </div>
                                        )}
                                        <div className="form__theme">{comment.userDto.username}</div>
                                    </div>
                                    {editingCommentId === comment.id ? (
                                        // Display input field for editing
                                        <div className="theme__info">
                                <textarea
                                    value={editedCommentContent}
                                    onChange={(e) => setEditedCommentContent(e.target.value)}
                                ></textarea>
                                            <div className="action__button">
                                                <button onClick={() => submitEditedComment(comment.id)}>Подтвердить редактирование</button>
                                                <button onClick={cancelEditingComment}>Отмена</button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Display comment content as text
                                        <div className="theme__info">
                                            {comment.content}
                                        </div>
                                    )}
                                    {/*<div className="action__button">*/}
                                    {/*    <button className="action__button__element">*/}
                                    {/*        <img src='/img/icons8-заполненная-тема-96 1.png' width="110%"*/}
                                    {/*             height="110%"/>*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                    <div className="display__flex">
                                        <div className="form__date">
                                            {comment.createdAt && (
                                                <div>
                                                    <div>{new Date(comment.createdAt).toLocaleDateString()}</div>
                                                    <div>{new Date(comment.createdAt).toLocaleTimeString()}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    {scrollingUserId === comment.userDto.id ? (
                                        <>
                                            <button className='edit__img__container' onClick={() => togglePopup(comment.id)}>
                                                <img src="/img/троеточие.png" alt="" width='100%' height='100%'/>
                                            </button>
                                            <div className='parametr__buttons__container'>
                                                <div>
                                                    <button
                                                        type={"button"}
                                                        className='post'
                                                        onClick={() => startEditingComment(comment.id, comment.content)}
                                                    >
                                                        Изменить
                                                    </button>
                                                </div>
                                                <div>
                                                    <button
                                                        type={"button"}
                                                        className='post delete'
                                                        onClick={() => handleDelete(comment.id)}
                                                    >
                                                        Удалить
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (<></>)}
                                </div>
                            </div>
                        ))}

                        {/* Comment Form Section */}
                        <div className="form main">
                            <div className="theme__container main__page">
                                <div className="display__flex">
                                    {userProfilePictures[post.userDto.id] && (
                                        <div className="theme__img">
                                            <img src={userProfilePictures[scrollingUserId].src} width="100%"
                                                 height="100%" alt=""/>
                                        </div>
                                    )}
                                    <div className="form__theme">{scrollingUsername}</div>
                                </div>
                                <br/>
                                <textarea
                                    name="textarea"
                                    className="form__page__subtitle input forum__page"
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    placeholder={"Начните что думаете"}
                                ></textarea>

                                <div className='display__flex__mt'>
                                    <button className="next__step " onClick={handleCommentSubmit}>
                                        Опубликовать комментарий
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

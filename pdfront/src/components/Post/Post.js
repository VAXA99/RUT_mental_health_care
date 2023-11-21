import React from 'react';

function Post({ post }) {
    return (
        <div>
            <div className="display__flex">
                <div className="form__theme">thread</div>
                <div className="form__subtitle">{`# ${post.title}`}</div>
            </div>
            <div className="display__flex">
                <div className="form__owner">{`Создано: ${post.user.username}`}</div>
                <div className="form__date">{post.createdAt}</div>
            </div>
            <div className="theme__container">
                <div className="display__flex">
{/*
                    <div className="theme__img"><img src={post.user.profileImage} width="100%" height="100%" alt="" /></div>
*/}
                    <div className="form__theme">{post.user.username}</div>
                </div>
                <div className="theme__title">{post.title}</div>
                <div className="theme__info">{post.content}</div>
            </div>
        </div>
    );
}

export default Post;

import React, { useState } from 'react';
import Card from "../UI/Card/Card";
import Likes from "../Likes/Likes";
import Replies from '../Replies/Replies';
import NewComment from '../NewComment/NewComment'


import './Comments.css'

const Comments = (props) => {
    
    const Data = props.data;

    const [reply, setReply] = useState('');

    const replyHandler = (event) => {
        if (reply) {
            setReply('')
            return;
        }
        setReply(event.target.parentElement.getAttribute('id'))
    }

    return (
        <div className="comments"> {
            Data.comments.map((comment) => (
                <div>
                    <Card key={comment.id} className="comment">
                        <Likes score={comment.score}></Likes>

                        <div key={comment.id} className="comment-item">
                            <div className='comment-header'>
                                <div className='comment-creator'>
                                    <figure>
                                        <img src={require(`../../${comment.user.image.png}`)} alt="" />
                                    </figure>
                                    <p>{comment.user.username}</p>
                                    <p className='comment-date'>{comment.createdAt}</p>
                                </div>
                                <p className="comment-reply" onClick={replyHandler} id={comment.id}>
                                    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" />
                                    </svg>
                                    <span>Reply</span>
                                </p>
                            </div>
                            <div className="comment-content">
                                <p>{comment.content}</p>
                            </div>
                        </div>
                    </Card>
                    {(comment.replies.length ? <Replies replies={comment.replies}></Replies> : '')}
                    {Number(reply) === comment.id ? <NewComment className="new-reply" btn="reply" text="reply" ></NewComment> : ''}

                </div>
            ))
        }
        </div>
    )
}
export default Comments;
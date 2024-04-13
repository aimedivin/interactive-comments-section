import React, { useState } from 'react'

import Likes from "../Likes/Likes";
import Card from "../UI/Card/Card";
import NewComment from '../NewComment/NewComment';

import '../Comments/Comments.css'
import './Replies.css'

import Data from "../Data";

const Replies = (props) => {
    const [replyNum, setReply] = useState('');
    const [replyEdit, setReplyEdit] = useState('')

    const replyHandler = (event) => {
        if (replyNum) {
            setReply('')
            return;
        }
        setReply(event.target.parentElement.getAttribute('id'))
    }

    const replyEditHandler = (event) => {
        setReplyEdit(event.target.parentElement.getAttribute('id'));
    }

    return (
        <div className="reply">{
            props.replies.map((reply) => (
                <div>
                    <Card key={reply.id} className="comment">
                        <Likes score={reply.score}></Likes>
                        <div className="comment-item">
                            <div className='comment-header'>
                                <div className='comment-creator'>
                                    <figure>
                                        <img src={require(`../../${reply.user.image.png}`)} alt="" />
                                    </figure>
                                    <p>{reply.user.username}</p>
                                    {
                                        (reply.user.username === Data.currentUser.username ? <p className='reply-you'>you</p> : '')
                                    }
                                    <p className='comment-date'>{reply.createdAt}</p>
                                </div>
                                {
                                    (reply.user.username === Data.currentUser.username ?
                                        <div className="reply-action">
                                            <p className="delete-reply">
                                                <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" />
                                                </svg>
                                                <span>Delete</span>
                                            </p>
                                            <p className="edit-reply" id={"edit-" + reply.id}>
                                                <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" />
                                                </svg>
                                                <span onClick={replyEditHandler}>Edit</span>
                                            </p>
                                        </div>
                                        :
                                        <p className="comment-reply" onClick={replyHandler} id={reply.id}>
                                            <svg width="14" height="13" xmlns="http:www.w3.org/2000/svg">
                                                <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" />
                                            </svg>
                                            <span>Reply</span>
                                        </p>
                                    )
                                }
                            </div>
                            {
                                replyEdit === "edit-" + reply.id ?
                                    <div className="reply-content">
                                        <form className='edit--reply-form'>
                                            <textarea cols="30" rows="10">{'@' + reply.replyingTo+ ' ' + reply.content}</textarea>
                                            <button type='submit' className='new--comment-send-btn'>update</button>
                                        </form>
                                    </div>
                                    :
                                    <div className="reply-content">
                                        <p><span>@{reply.replyingTo}</span> {reply.content}</p>
                                    </div>
                            }
                        </div>
                    </Card>
                    {Number(replyNum) === reply.id ? <NewComment className='new-reply' btn="reply" text="reply" ></NewComment> : ''}
                </div>
            ))
        }
        </div>
    )
}

export default Replies;

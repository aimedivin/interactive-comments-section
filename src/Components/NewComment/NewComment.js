import Card from "../UI/Card/Card";
import userPhoto from "../../assets/avatars/image-juliusomo.png"

import './NewComment.css'
import { useState } from "react";
import Data from "../Data";

const NewComment = (props) => {
    const [newComment, setNewComment] = useState('');
    

    const commentInputHandler = (event) => {
        setNewComment(event.target.value);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const date = new Date(Date.now());
        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is zero-based, so add 1
        const year = date.getFullYear();

        const convertedDate = `${day}-${month}-${year}`;

        const newCommentData = {
            "id": Math.random().toString(),
            "content": newComment,
            "createdAt": convertedDate,
            "score": 0,
            "user": {
                "image": {
                    "png": Data.currentUser.image.png,
                    "webp": Data.currentUser.image.webp
                },
                "username": Data.currentUser.username
            },
            "replies": []
        }
        props.onSaveCommentData(newCommentData);
        setNewComment('')

    }

    const text = 'Add a ' + props.text+ '...';
    
    return (
        <Card className={props.className}>
            <div className="new-comment">
                <form action="" className="new--comment-form" onSubmit={formSubmitHandler}>
                    <figure>
                        <img src={userPhoto} alt="" />
                    </figure>
                    <textarea className="new--comment-content" value={newComment} placeholder={text} onChange={commentInputHandler}></textarea>
                    <button type="submit" className="new--comment-send-btn">{props.btn}</button>
                </form>
            </div>
        </Card>
    )
}

export default NewComment;
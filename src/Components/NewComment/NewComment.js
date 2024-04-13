import Card from "../UI/Card/Card";
import userPhoto from "../../assets/avatars/image-juliusomo.png"

import './NewComment.css'
import { useState } from "react";
import Data from "../Data";
const setDate = () => {
    const date = new Date(Date.now());
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

const NewComment = (props) => {
    const [newComment, setNewComment] = useState('');


    const commentInputHandler = (event) => {
        console.log(props.btn);
        setNewComment(event.target.value);
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        
        const convertedDate = setDate();

        const newData = {
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
        }
        if (event.target.lastElementChild.innerText === 'SEND') {
            newData['replies'] = [];
            props.onSaveCommentData(newData);
        } else {
            newData['replyingTo'] = props.commenter;
            props.onSaveReplyData(newData)
        }

        setNewComment('')
    }

    const text = 'Add a ' + props.text + '...';

    return (
        <Card className={props.className}>
            <div className="new-comment">
                <form action="" className="new--comment-form" onSubmit={formSubmitHandler}>
                    <figure>
                        <img src={userPhoto} alt="" />
                    </figure>
                    <textarea className="new--comment-content" value={newComment} placeholder={text} onChange={commentInputHandler} required></textarea>
                    <button type="submit" className="new--comment-send-btn">{props.btn}</button>
                </form>
            </div>
        </Card>
    )
}

export default NewComment;
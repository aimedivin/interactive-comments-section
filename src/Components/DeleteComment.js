import './DeleteComment.css'
import Card from './UI/Card/Card';


const DeleteComment = (props) => {

    const onCancelHandler = () => {
        props.saveDeleteComment(false)
    }
    const onApproveHandler = () => {
        props.saveDeleteComment(true)
    }

    return <div className="delete-comment" style={{ display: props.display }}>
        <Card className='delete-card'>
            <h2>Delete comment</h2>
            <p className='delete-message'>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <div className='delete-action'>
                <button className='delete--btn-cancel' onClick={onCancelHandler}>No, cancel</button>
                <button className='delete--btn-approve' onClick={onApproveHandler}>yes, delete</button>
            </div>
        </Card>
    </div>
}

export default DeleteComment;
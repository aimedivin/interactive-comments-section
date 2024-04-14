import { useState } from 'react';
import './App.css';
import Comments from './Components/Comments/Comments';
import Data from './Components/Data';
import NewComment from './Components/NewComment/NewComment';

import DeleteComment from './Components/DeleteComment';

function App() {
  const [commentData, setCommentData] = useState(Data);


  const saveCommentDataHandler = (newCommentData) => {
    console.log(newCommentData);
    setCommentData((previousData) => {

      const result = { ...previousData }
      result.comments.push(newCommentData);
      return result
    })
  }

  //DELETE USE STATE
  const [isDeleteActive, setIsDeleteActive] = useState(false)
  const [deleteElement, setDeleteElement] = useState('')

  //DELETE AND UPDATE REPLY
  const updateDeleteReplyHandler = (actionCode, content) => {
    const [actionMode, replyNum] = actionCode.split('-');


    if (actionMode === 'update') {
      setCommentData(previousData => {
        return {
          currentUser: previousData.currentUser,
          comments: Data.comments.map(comment => {
            if (comment.replies.length) {
              comment.replies.forEach(reply => {

                if (reply.id === +replyNum) {
                  reply.content = content
                }
              })
            }
            return comment
          })
        }
      }
      )
    }

    if (actionMode === 'delete') {
      setDeleteElement(`reply-${replyNum}`);
      console.log(deleteElement);
      setIsDeleteActive(true);
    }
  }

  // DELETING COMMENT OR REPLY
  const onSaveDeleteComment = (decision) => {
    if (!decision) {
      setDeleteElement('');
      setIsDeleteActive(false)
      return;
    }

    const [deleteType, elementNum] = deleteElement.split('-')
    if (deleteType === 'reply') {
      console.log('in');
      setCommentData(previousData => {
        return {
          currentUser: previousData.currentUser,
          comments: Data.comments.map(comment => {
            if (comment.replies.length) {
              const replyResult = comment.replies.filter(reply => {
                if (reply.id === +elementNum) {
                  return false
                }
                return true
              })
              comment.replies = replyResult;
            }
            return comment
          })
        }
      })
    }

    setIsDeleteActive(false)
  }

  return (
    <div className="App">
      <DeleteComment
        display={isDeleteActive ? 'flex' : 'none'}
        saveDeleteComment={onSaveDeleteComment}
      />
      <Comments
        data={commentData}
        updateDeleteReply={updateDeleteReplyHandler}
      />
      <NewComment btn="Send" text='comment' onSaveCommentData={saveCommentDataHandler} />
    </div>
  );
}

export default App;

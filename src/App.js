import { useState } from 'react';
import './App.css';
import Comments from './Components/Comments/Comments';
import Data from './Components/Data';
import NewComment from './Components/NewComment/NewComment';

function App() {
  const [commentData, setCommentData] = useState(Data)
  const saveCommentDataHandler = (newCommentData) => {
    console.log(newCommentData);
    setCommentData((previousData) => {

      const result = { ...previousData }
      result.comments.push(newCommentData);
      return result
    })
  }
  return (
    <div className="App">
      <Comments data={commentData}></Comments>
      <NewComment btn="Send" text='comment' onSaveCommentData={saveCommentDataHandler}></NewComment>
    </div>
  );
}

export default App;

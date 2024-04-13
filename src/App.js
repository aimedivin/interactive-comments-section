import { useState } from 'react';
import './App.css';
import Comments from './Components/Comments/Comments';
import Data from './Components/Data';
import NewComment from './Components/NewComment/NewComment';

function App() {
  const [realData, setRealData] = useState(Data)
  const saveCommentDataHandler = (newCommentData) => {

    setRealData((previousData) => {
      const result = { ...previousData }
      result.comments.push(newCommentData);
      return result
    }
    )
  }
  return (
    <div className="App">
      <Comments data={realData}></Comments>
      <NewComment btn="Send" text='comment' onSaveCommentData={saveCommentDataHandler}></NewComment>
    </div>
  );
}

export default App;

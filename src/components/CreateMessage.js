import React, { useState, useContext } from 'react';
import { GameContext } from "./GameMaster";

const CreateMessage = ({ submitNewMessage }) => {
  const context = useContext(GameContext);
  const dispatch = context.gameDispatch;
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  
  const updateMessage = (event) => {
    setMessage(event.target.value);
    setInputValue(event.target.value);
  }
  
  const submitMessage = (event) => {
    event.preventDefault();
    dispatch({
      type: "resetMessage",
      payload: message
    });
    setInputValue("");
  }
  
  //disallow unsupported characters during input
  
  //normalize capitalization and remove extra spaces
  
  //send message to ThingsToSay (convert thingsToSay into component)
  
  //input field for new message
  
  //submit button
  
  //possible -- include component to evaluate difficulty of input message before submit

  return (
    <form onSubmit={submitMessage}>
      <div className="createMessageContainer">
          <label>Change message:</label>
          <input 
            type="text"
            name="message"
            value={inputValue}
            onChange={updateMessage}
          />
          <button className="submitButton" type="submit">submit</button>
      </div>
    </form>
  )

}

export default CreateMessage;

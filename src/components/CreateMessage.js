import React, { useState, useContext } from 'react';
import { GameContext } from "./GameMaster";

const CreateMessage = () => {
  const context = useContext(GameContext);
  const dispatch = context.gameDispatch;
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const updateMessage = (event) => {
    let input = event.target.value;
    if (regex.test(input)) {
      alert("Some special characters are okay ... but that one isn't.")
      setInputValue("");
    }
    setMessage(input);
    setInputValue(input);
  }

  const regex = /[^\w\s\?\.\,\!\'\"\(\)\&\:\;\/\-\=\+\$\@]/

  const submitMessage = (event) => {
    event.preventDefault();
    dispatch({
      type: "resetMessage",
      payload: message
    });
    setInputValue("");
  }

  return (
    <form onSubmit={submitMessage}>
      <div className="createMessageContainer">
          <label>Change message:</label>
          <input 
            type="text"
            name="message"
            value={inputValue}
            onChange={updateMessage}
            maxLength="50"
          />
          <button className="submitButton" type="submit">submit</button>
      </div>
    </form>
  )

}

export default CreateMessage;

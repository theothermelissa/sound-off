import React, { useState } from 'react';

const CreateMessage = ({ submitNewMessage }) => {
  const [message, setMessage] = useState("");
  
  const updateMessage = (event) => {
    setMessage(event.target.value);
  }
  
  const submitMessage = (event) => {
    event.preventDefault();
    submitNewMessage(message);
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
            onChange={updateMessage}
          />
          <button className="submitButton" type="submit">submit new message</button>
      </div>
    </form>
  )

}

export default CreateMessage;

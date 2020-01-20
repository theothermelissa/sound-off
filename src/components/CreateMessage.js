import React, { useState } from 'react';

const CreateMessage = ({ submitNewMessage }) => {
  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState("What would you like to say?")

  const updateMessage = (event) => {
    setMessage(event.target.value);
  }

  const submitMessage = (event) => {
    event.preventDefault();
    submitNewMessage(message);
    setPlaceholder("How about another?");
  }

  //disallow unsupported characters during input

  return (
    <form onSubmit={submitMessage}>
      <div className="createMessageContainer">
          <label>I'd like to say:</label>
          <input 
            type="text"
            name="message"
            onChange={updateMessage}
            placeholder={placeholder}
          />
          <button className="submitButton" type="submit">submit</button>
      </div>
    </form>

    // <div>
    //   <textarea 
    //     className="input"
    //     value={message}
    //     type="text"
    //     onChange={updateMessage} />
    //   {/* <div
    //     className="preview"
    //     // dangerouslySetInnerHTML={message}
    //   /> */}
    // </div>
  )
  //normalize capitalization and remove extra spaces
  
  //send message to ThingsToSay (convert thingsToSay into component)
  
  //input field for new message
  
  //submit button
  
  //possible -- include component to evaluate difficulty of input message before submit

}

export default CreateMessage;

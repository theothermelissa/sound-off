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

  return (
    <form onSubmit={submitMessage}>
      <div>
          <label>New Message:</label>
          <input 
            type="text"
            name="message"
            onChange={updateMessage}
          />
          <input
            type="submit"
          />
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

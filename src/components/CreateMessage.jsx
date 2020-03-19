import React, { useState, useContext } from 'react';
import { GameContext } from './GameMaster';

const CreateMessage = () => {
  const { gameDispatch } = useContext(GameContext);
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);

  const disallowedRegex = /[^\w\s?.,!'"()&:;/\-=+$@]/;
  // const bookendSpaceRegex = /[]/

  const displayNewMessageForm = () => {
    setShowNewMessageForm(true);
  };

  const updateMessage = (event) => {
    const input = event.target.value;
    if (disallowedRegex.test(input)) {
      alert("Some special characters have Morse translations, but that one doesn't.");
      setInputValue('');
      return;
    }
    setMessage(input.trim());
    setInputValue(input);
  };


  const submitMessage = (event) => {
    event.preventDefault();
    if (!message) {
      alert('No blank messages, if you please.');
      setInputValue('');
      return;
    }
    gameDispatch({
      type: 'newMessage',
      payload: message.trim(),
    });
    setInputValue('');
  };

  if (showNewMessageForm) {
    return (
      <div className="createMessageContainer">
        <form id="createMessage" onSubmit={submitMessage}>
          <div className="messageInput">
            <label htmlFor="messageInput" className="text-label">
              New message:
              <input
                type="text"
                className="text-input"
                name="messageInput"
                id="messageInput"
                value={inputValue}
                onChange={updateMessage}
                maxLength="42"
                tabIndex="0"
              />
            </label>
            {inputValue && <button htmlFor="createMessage" className="submitButton" type="submit">Play Again</button>}
          </div>
        </form>
      </div>
    );
  }
  return (
    <div className="createMessageContainer">
      <button className="submitButton" type="submit" onClick={displayNewMessageForm}>Play Again</button>
    </div>
  );
};

export default CreateMessage;

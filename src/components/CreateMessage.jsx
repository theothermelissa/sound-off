import React, { useState, useContext } from 'react';
import { GameContext } from './GameMaster';
import { SettingsContext } from '../App';
import SendableMessage from './SendableMessage';

const CreateMessage = () => {
  const { gameDispatch } = useContext(GameContext);
  const { settingsDispatch } = useContext(SettingsContext);
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [showNewMessageForm, setShowNewMessageForm] = useState(false);
  const [showShareMessageForm, setShowShareMessageForm] = useState(false);

  const disallowedRegex = /[^\w\s?.,!'"()&:;/\-=+$@]/;
  // const bookendSpaceRegex = /[]/

  const displayNewMessageForm = () => {
    setShowNewMessageForm(true);
  };

  const displayShareMessageForm = () => {
    setShowShareMessageForm(true);
    settingsDispatch({
      type: 'createSendableMessage',
    });
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
      <form id="createMessage" onSubmit={submitMessage}>
        <div className="createMessageContainer">
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
            {inputValue && <button htmlFor="createMessage" className="submitButton" type="submit">play again</button>}
          </label>
        </div>
      </form>
    );
  } if (showShareMessageForm) {
    return (
      <SendableMessage />
    );
  }
  return (
    <div>
      <button type="submit" onClick={displayNewMessageForm}>Play Again</button>
      <button type="submit" onClick={displayShareMessageForm}>Share Message</button>
    </div>
  );
};

export default CreateMessage;

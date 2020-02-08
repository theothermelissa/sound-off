import React, { useState, useContext } from 'react';
import { GameContext } from './GameMaster';

const CreateMessage = () => {
  const { gameDispatch } = useContext(GameContext);
  const [message, setMessage] = useState('');
  const [inputValue, setInputValue] = useState('');

  const disallowedRegex = /[^\w\s?.,!'"()&:;/\-=+$@]/;
  // const bookendSpaceRegex = /[]/

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
      alert('No blank messages, if you please.')
      setInputValue('');
      return;
    }
    gameDispatch({
      type: 'newMessage',
      payload: message.trim(),
    });
    setInputValue('');
  };

  return (
    <form onSubmit={submitMessage}>
      <div className="createMessageContainer">
        <label className="text-label">New message:</label>
        <input
          type="text"
          className="text-input"
          name="message"
          value={inputValue}
          onChange={updateMessage}
          maxLength="42"
          tabIndex="0"
        />
        {inputValue && <button className="submitButton" type="submit">play again</button>}
      </div>
    </form>
  );
};

export default CreateMessage;

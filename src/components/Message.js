import React, { useState } from 'react';
import Prompt from './Prompt';

const Message = ({ userSubmittedMessage, completeMessage, resetLastSignal, lastSignalReceived }) => {
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);

  const messageCharacters = userSubmittedMessage.split("");
  const totalCharacters = messageCharacters.length;

  const isSpace =(char) => {
    return (char === " " || char === "   ");
  };


  const onCompletePrompt = () => {
    let newIndex = activeCharacterIndex + 1;
    if (newIndex < totalCharacters) {
      setActiveCharacterIndex(newIndex);
      if (isSpace(messageCharacters[newIndex])) {
        setActiveCharacterIndex(newIndex + 1);
      }
    } else {
      setActiveCharacterIndex(0);
      setTimeout(completeMessage, 550);
    }
  };

  return (
    messageCharacters.map((letter, index) => {
      return (
          <Prompt 
            char={letter}
            activeCharacterIndex={activeCharacterIndex}
            lastSignalReceived={lastSignalReceived}
            key={letter+index}
            position={index}
            completePrompt={onCompletePrompt}
            resetLastSignal={resetLastSignal}
          />
      )
    })
  )
};

export default Message;

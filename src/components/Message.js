import React, { useState, useEffect } from 'react';
import Prompt from './Prompt';

const Message = ({ 
  userSubmittedMessage,
  completeMessage,
  resetLastSignal,
  isComplete,
  isBegun,
  lastSignalReceived,
  logError,
  }) => {

  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);

  const messageCharacters = userSubmittedMessage.split("");
  const totalCharacters = messageCharacters.length;

  const isSpace =(char) => {
    return (char === " " || char === "   ");
  };

  useEffect(() => {
    setActiveCharacterIndex(0);
  }, [userSubmittedMessage, isComplete, isBegun]);

  const onCompletePrompt = () => {
    let newIndex = activeCharacterIndex + 1;
    if (newIndex < totalCharacters) {
      setActiveCharacterIndex(newIndex);
      if (isSpace(messageCharacters[newIndex])) {
        setActiveCharacterIndex(newIndex + 1);
      }
    } else {
      setActiveCharacterIndex(0);
      setTimeout(completeMessage, 600);
    }
  };

  return (
    messageCharacters.map((letter, index) => {
      return (
          <Prompt 
            char={letter}
            position={index}
            activeCharacterIndex={activeCharacterIndex}
            isComplete={isComplete}
            isBegun={isBegun}
            logError={logError}
            lastSignalReceived={lastSignalReceived}
            completePrompt={onCompletePrompt}
            resetLastSignal={resetLastSignal}
            key={letter+index}
          />
      )
    })
  )
};

export default Message;

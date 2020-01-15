import React, { useState } from 'react';
import Prompt from './Prompt';
import thingsToSay from '../assets/thingsToSay'

const Message = ({ markMessageComplete, resetLastSignal, messageIndex, lastSignalReceived }) => {
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const messageCharacters = thingsToSay[messageIndex].statement.split("");
  const totalCharacters = messageCharacters.length;
  
  const onCompletePrompt = () => {
    let newIndex = activeCharacterIndex + 1;
    if(newIndex < totalCharacters) {
      resetLastSignal();
      setActiveCharacterIndex(activeCharacterIndex + 1);
    } else {
      markMessageComplete();
    }
  };

  return (
    messageCharacters.map((letter, index) => {
      return (
          <Prompt 
            char={letter}
            activeCharacterIndex={activeCharacterIndex}
            totalCharacters={totalCharacters}
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

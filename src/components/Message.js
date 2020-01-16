import React, { useState } from 'react';
import Prompt from './Prompt';
import thingsToSay from '../assets/thingsToSay'

const Message = ({ completeMessage, resetLastSignal, messageIndex, lastSignalReceived }) => {
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);

  const messageCharacters = thingsToSay[messageIndex].statement.split("");
  const totalCharacters = messageCharacters.length;
  
  const onCompletePrompt = () => {
    let newIndex = activeCharacterIndex + 1;
    if(newIndex < totalCharacters) {
      setActiveCharacterIndex(newIndex);
    } else {
      setActiveCharacterIndex(0);
      setTimeout(completeMessage, 200);
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

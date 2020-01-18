import React, { useState } from 'react';
import Prompt from './Prompt';
import thingsToSay from '../assets/thingsToSay'

const Message = ({ completeMessage, resetLastSignal, messageIndex, lastSignalReceived }) => {
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);

  const messageCharacters = thingsToSay[messageIndex].statement.split("");
  const totalCharacters = messageCharacters.length;

  const isSpace =(char) => {
    return (char === " " || char === "   ");
  };


  const onCompletePrompt = () => {
    let newIndex = activeCharacterIndex + 1;
    if (newIndex < totalCharacters) {
      setActiveCharacterIndex(newIndex);
      console.log("Next character: ", messageCharacters[newIndex]);
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

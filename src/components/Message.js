import React, { useState } from 'react';
import Prompt from './Prompt';
import thingsToSay from '../assets/thingsToSay'
import { act } from 'react-dom/test-utils';

const Message = ({ markMessageComplete, markLetterSignalComplete, messageIndex, lastSignalReceived }) => {
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const messageCharacters = thingsToSay[messageIndex].statement.split("");
  console.log("Active character index: ", activeCharacterIndex);
  
  const onCompleteSignal = (index) => {
    let newIndex = index + 1;
    if(newIndex < messageCharacters.length) {
      markLetterSignalComplete();
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
          activeLetterIndex={activeCharacterIndex}
          lastSignalReceived={lastSignalReceived}
          key={letter+index}
          position={index}
          completeSignal={onCompleteSignal}
        />
      )
    })
  )
};

export default Message;

import React, { useState } from 'react';
import Prompt from './Prompt';
import thingsToSay from '../assets/thingsToSay'

const Message = ({ completeMessage, resetLastSignal, messageIndex, lastSignalReceived }) => {
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const messageCharacters = thingsToSay[messageIndex].statement.split("");
  const totalCharacters = messageCharacters.length;
  console.log("Active Character: ", activeCharacterIndex)
  
  const onCompletePrompt = (index) => {
    console.log("Message says the ", index, "prompt is complete.")
    let newIndex = activeCharacterIndex + 1;
    if(newIndex < totalCharacters) {
      resetLastSignal();
      setActiveCharacterIndex(activeCharacterIndex + 1);
    } else {
      setActiveCharacterIndex(0);
      completeMessage();
      console.log("All done!")
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

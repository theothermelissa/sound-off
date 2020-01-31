import React, { useState, useEffect, useContext } from 'react';
import Sequence from './Sequence';
import '../App.css';

const Prompt = ({ 
  char,
  position,
  activeCharacterIndex,
  completePrompt,
}) => {
  const [promptIsComplete, setPromptIsComplete] = useState(false);

  const onCompleteSequence = () => {
    setPromptIsComplete(true);
    completePrompt();
  };

  const translatedChar = (letter) => {
    if (letter === " ") {
      return "&nbsp"
    } else if (letter === "   ") {
      return "&br"
    } else {
      return letter.toLowerCase()
    };
  };

  return (
    <div className="promptContainer">
      <div className={`letter${promptIsComplete ? ' completedText' : ''}`}>{char}</div>
      <div className="sequence">
        <Sequence 
          char={translatedChar(char)}
          position={position}
          activeCharacterIndex={activeCharacterIndex}
          completeSequence={onCompleteSequence}
          promptIsComplete={promptIsComplete}
          />
      </div>
    </div>
  );

}

export default Prompt;
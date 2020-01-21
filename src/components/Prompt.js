import React, { useState } from 'react';
import Sequence from './Sequence';
import '../App.css';

const Prompt = ({ char, activeCharacterIndex, lastSignalReceived, position, completePrompt, resetLastSignal, logError }) => {
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
          activeCharacterIndex={activeCharacterIndex}
          lastSignalReceived={lastSignalReceived}
          position={position}
          completeSequence={onCompleteSequence}
          resetLastSignal={resetLastSignal}
          promptIsComplete={promptIsComplete}
          logError={logError}
          />
      </div>
    </div>
  );

}

export default Prompt;
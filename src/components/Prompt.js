import React, { useState, useEffect } from 'react';
import Sequence from './Sequence';
import '../App.css';

const Prompt = ({ 
  char,
  position,
  activeCharacterIndex,
  isComplete,
  isBegun,
  logError,
  lastSignalReceived,
  completePrompt,
  resetLastSignal,
}) => {
  const [promptIsComplete, setPromptIsComplete] = useState(false);

  const onCompleteSequence = () => {
    setPromptIsComplete(true);
    completePrompt();
  };

  useEffect(() => {
    if (!isBegun || isComplete) {
      setPromptIsComplete(false);
    }
  }, [isBegun, isComplete])

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
          isComplete={isComplete}
          isBegun={isBegun}
          logError={logError}
          lastSignalReceived={lastSignalReceived}
          completeSequence={onCompleteSequence}
          resetLastSignal={resetLastSignal}
          promptIsComplete={promptIsComplete}
          // timerIsRunning={timerIsRunning}
          // trackElapsedTime={trackElapsedTime}
          />
      </div>
    </div>
  );

}

export default Prompt;
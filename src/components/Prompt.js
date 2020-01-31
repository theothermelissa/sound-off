import React, { useState, useEffect, useContext } from 'react';
import Sequence from './Sequence';
import '../App.css';
import { gameDispatch } from "./GameMaster"

const Prompt = ({ 
  char,
  position,
  activeCharacterIndex,
  completePrompt,
  resetLastSignal,
}) => {
  const [promptIsComplete, setPromptIsComplete] = useState(false);

  const dispatch = useContext(gameDispatch);


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
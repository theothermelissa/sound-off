import React, { useState } from 'react';
import Sequence from './Sequence';
import '../App.css';

const Prompt = ({ char, activeCharacterIndex, lastSignalReceived, position, completePrompt, resetLastSignal }) => {
  const [promptIsComplete, setPromptIsComplete] = useState(false);

  const onCompleteSequence = () => {
    setPromptIsComplete(true);
    completePrompt();
  };

  return (
    <div className="promptContainer">
      <div className={`letter${promptIsComplete ? 'Complete' : ''}`}>{char}</div>
      <div className="sequence">
        <Sequence 
          char={char}
          activeCharacterIndex={activeCharacterIndex}
          lastSignalReceived={lastSignalReceived}
          position={position}
          completeSequence={onCompleteSequence}
          resetLastSignal={resetLastSignal}
          promptIsComplete={promptIsComplete}
          />
      </div>
    </div>
  );

}

export default Prompt;
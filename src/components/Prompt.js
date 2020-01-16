import React, { useState } from 'react';
// import alphabet from '../assets/codeTranslationKey';
import Sequence from './Sequence';
import '../App.css';
import { act } from 'react-dom/test-utils';

const Prompt = ({ char, resetLastSignal, activeCharacterIndex, lastSignalReceived, position, completePrompt, totalCharacters }) => {
  const [promptIsComplete, setPromptIsComplete] = useState(false);

  // console.log("Is the ", position, " prompt complete?", promptIsComplete)


  const onCompleteSequence = (index) => {
    // console.log("Prompt says the ", index, "codeSignal is complete.")
    setPromptIsComplete(true);
    completePrompt(position);
  };

  return (
    <div className="promptContainer">
      <div className={`letter${promptIsComplete ? 'Complete' : ''}`}>{char}</div>
      <div className="sequence">
        <Sequence 
          char={char}
          position={position}
          resetLastSignal={resetLastSignal}
          lastSignalReceived={lastSignalReceived}
          completeSequence={onCompleteSequence}
          activeCharacterIndex={activeCharacterIndex}
          totalCharacters={totalCharacters}
          promptIsComplete={promptIsComplete}
          />
      </div>
    </div>
  );

}

export default Prompt;
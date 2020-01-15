import React, { useState } from 'react';
// import alphabet from '../assets/codeTranslationKey';
import Sequence from './Sequence';
import '../App.css';
import { act } from 'react-dom/test-utils';

const Prompt = ({ char, resetLastSignal, activeCharacterIndex, lastSignalReceived, position, completePrompt, totalCharacters }) => {

  const onCompleteSequence = () => {
    completePrompt(position);
  };

  const isComplete = () => (position < activeCharacterIndex);

  // `${codeSignal.id} ${isComplete(index) ? 'completed' : ''}`
  return (
    <div className="promptContainer">
      <div className={`letter${isComplete() ? 'Complete' : ''}`}>{char}</div>
      <div className="sequence">
        <Sequence 
          char={char}
          position={position}
          resetLastSignal={resetLastSignal}
          lastSignalReceived={lastSignalReceived}
          completeSequence={onCompleteSequence}
          activeCharacterIndex={activeCharacterIndex}
          totalCharacters={totalCharacters}
        />
      </div>
    </div>
  );

}

export default Prompt;
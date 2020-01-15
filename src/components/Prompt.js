import React, { useState } from 'react';
// import alphabet from '../assets/codeTranslationKey';
import Sequence from './Sequence';
import '../App.css';
import { act } from 'react-dom/test-utils';

const Prompt = ({ char, resetLastSignal, activeCharacterIndex, lastSignalReceived, position, completePrompt, totalCharacters }) => {
  const activeStatus = (position === activeCharacterIndex) ? true : false;
  console.log("Is Prompt index ", position, " active? ", activeStatus)

  const onCompleteSequence = () => {
    console.log("Completed prompt: ", position)
    completePrompt(position);
  };

  return (
    <div className="promptContainer">
      <div className="letter">{char}</div>
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
  );

}

export default Prompt;
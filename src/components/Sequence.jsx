import React, { useState, useEffect, useContext } from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';
import CodeSignal from './CodeSignal';
import { GameContext } from "./GameMaster";

const Sequence = ({
  char,
  position,
  activeCharacterIndex,
  completeSequence,
  promptIsComplete,
  }) => {

  const { gameDispatch, gameState: { isComplete, signalStartTimes } } = useContext(GameContext);
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const [sequenceIsComplete, setSequenceIsComplete] = useState(false);
  const isActive = () => signalStartTimes[0] && !isComplete;
  const [gameIsActive, setgameIsActive] = useState(isActive());
  const morseElementSequence = alphabet[char]["sequence"];
  const totalSignalsInChar = morseElementSequence.length;

  const onCompleteCodeSignal = (index) => {
    let newIndex = index + 1;
    if (newIndex < totalSignalsInChar) {
      setCurrentSignalIndex(newIndex);
      gameDispatch({
        type: "resetSignal"
      })
    } else {
      completeSequence();
      setSequenceIsComplete(true);
      setCurrentSignalIndex(0);
    }
  };

  useEffect(() => {
    if (!gameIsActive) {
      setCurrentSignalIndex(0);
      setSequenceIsComplete(false);
    }
  }, [gameIsActive]);

  return (
    morseElementSequence.map((codeSignal, index) => {
      return (
          <CodeSignal
            element={codeSignal}
            elementName={codeSignal.id}
            elementIndex={index}
            key={char + codeSignal.id + index}
            characterPosition={position}
            activeSignalIndex={currentSignalIndex}
            activeCharacterIndex={activeCharacterIndex}
            sequenceIsComplete={sequenceIsComplete}
            completeCodeSignal={onCompleteCodeSignal}
            promptIsComplete={promptIsComplete}
          />
      )
    })
    )
};
  
  export default Sequence;

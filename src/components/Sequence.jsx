import React, { useState, useEffect, useContext } from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';
import CodeSignal from './CodeSignal';
import { GameContext } from './GameMaster';

const Sequence = ({
  char,
  position,
  activeCharacterIndex,
  completeSequence,
  promptIsComplete,
}) => {
  const { gameDispatch, gameState: { isBegun, lastSignalReceived } } = useContext(GameContext);
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const [sequenceIsComplete, setSequenceIsComplete] = useState(false);
  const morseElementSequence = alphabet[char].sequence;
  const charKeyCode = alphabet[char].code;
  const totalSignalsInChar = morseElementSequence.length;

  const onCompleteCodeSignal = (index) => {
    const newIndex = index + 1;
    if (newIndex < totalSignalsInChar) {
      setCurrentSignalIndex(newIndex);
      gameDispatch({
        type: 'resetSignal',
      });
    } else {
      completeSequence();
      setSequenceIsComplete(true);
      setCurrentSignalIndex(0);
    }
  };

  useEffect(() => {
    if (!isBegun) {
      setCurrentSignalIndex(0);
      setSequenceIsComplete(false);
    }
  }, [isBegun]);

  useEffect(() => {
    if (position === activeCharacterIndex) {
      if (lastSignalReceived === charKeyCode) {
        console.log('Match');
        completeSequence();
        setSequenceIsComplete(true);
        setCurrentSignalIndex(0);
      }
    }
  }, [lastSignalReceived, charKeyCode, position, activeCharacterIndex]);

  return (
    morseElementSequence.map((codeSignal, index) => (
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
    ))
  );
};

export default Sequence;

import React, { useState, useRef, useEffect } from 'react';
import CanvasLetterMaker from './CanvasLetterMaker';
import Message from './Message';
import alphabet from '../assets/codeTranslationKey';

const CanvasMaker = ({ message }) => {
  const [testCount, setTestCount] = useState(0);
  const canvasRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const [activeSignalIndex, setActiveSignalIndex] = useState(0);
  const totalSignals = useRef(0);

  const wordList = message.split(' ');
  const totalWords = wordList.length;

  const messageLength = () => {
    const total = message.reduce((sumLetters, letter) => ((letter === ' ')
      ? sumLetters
      : (sumLetters + 1)), 0);
    return total;
  };

  useEffect(() => {
    const newWordIndex = activeWordIndex + 1;
    const newCharacterIndex = activeCharacterIndex + 1;
    const newSignalIndex = activeSignalIndex + 1;
    if (!isComplete) {
      const timer = setTimeout(() => {
        for (let currentWordIndex = 0; currentWordIndex < totalWords; currentWordIndex += 1) {
          console.log('currentWordIndex: ', currentWordIndex);
          const currentWordLength = wordList[currentWordIndex].length;
          for (let currentLetterIndex = 0; currentLetterIndex < currentWordLength; currentLetterIndex += 1) {
            console.log('currentLetterIndex: ', currentLetterIndex);
            const letter = wordList[currentWordIndex][currentLetterIndex];
            totalSignals.current = alphabet[letter].sequence.length;
            for (let currentSignalIndex = 0; currentSignalIndex < totalSignals.current; currentSignalIndex += 1) {
              console.log('currentSignalIndex: ', currentSignalIndex);
              const isActive = () => ((activeWordIndex === currentWordIndex)
              && (activeCharacterIndex === currentLetterIndex)
              && (activeSignalIndex === currentSignalIndex));
              if (isActive) {
                // console.log('character: ', currentLetterIndex, 'isActive: ', isActive);
              }
              const isLastWord = () => (totalWords - 1 === currentWordIndex);
              const isLastLetter = () => (currentWordLength - 1 === currentLetterIndex);
              const isLastSignal = () => (totalSignals.current - 1 === currentSignalIndex);
              if (isActive()) {
              if (isLastWord() && isLastLetter() && isLastSignal()) {
                setIsComplete(true);
                return;
              } if (isLastLetter() && isLastSignal()) {
                setActiveWordIndex(newWordIndex);
                setActiveCharacterIndex(0);
                setActiveSignalIndex(0);
                return;
              } if (isLastSignal()) {
                setActiveCharacterIndex(newCharacterIndex);
                setActiveSignalIndex(0);
                return;
              }
              setActiveSignalIndex(newSignalIndex);
              }
            }
          }
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  });


  // useEffect(() => {
  //   const newCount = testCount + 1;
  //   if (!isComplete && testCount < 100) {
  //     const timer = setTimeout(() => {
  //       setTestCount(newCount);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // });

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext('2d');
  // });

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: '2px solid' }} />
      <Message
        activeSignalIndexForCanvas={activeSignalIndex}
        activeCharacterIndexForCanvas={activeCharacterIndex}
        activeWordIndexForCanvas={activeWordIndex}
        isComplete={isComplete}
      />
    </div>
  );
};

export default CanvasMaker;

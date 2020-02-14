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
    const newCount = testCount + 1;
    if (testCount < 5) {
      const timer = setTimeout(() => {
        console.log('newCount: ', newCount);
        setTestCount(newCount);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [testCount]);

  // const newSignalIndex = activeSignalIndex + 1;
  // const newCharacterIndex = activeCharacterIndex + 1;
  // const newWordIndex = activeWordIndex + 1;
  // for (let currentWordIndex = 0; currentWordIndex < totalWords; currentWordIndex += 1) {
  //   const currentWordLength = wordList[currentWordIndex].length;
  //   for (let currentLetterIndex = 0; currentLetterIndex < currentWordLength; currentLetterIndex += 1) {
  //     const letter = wordList[currentWordIndex][currentLetterIndex];
  //     totalSignals.current = alphabet[letter].sequence.length;
  //     for (let currentSignalIndex = 0; currentSignalIndex < totalSignals.current; currentSignalIndex += 1) {
  //       const lastWord = (totalWords === currentWordIndex);
  //       const lastLetter = (currentWordLength === currentLetterIndex);
  //       const lastSignal = (totalSignals.current === currentSignalIndex);
  //       if (lastWord && lastLetter && lastSignal) {
  //         setIsComplete(true);
  //         clearInterval(completeMessage);
  //       } else if (lastLetter && lastSignal) {
  //         setActiveWordIndex(newWordIndex);
  //       } else if (lastSignal) {
  //         setActiveCharacterIndex(newCharacterIndex);
  //       } else {
  //         console.log('Last signal? ', lastSignal);
  //         console.log('Last Letter? ', lastLetter);
  //         console.log('Last Word? ', lastWord);
  //         setActiveSignalIndex(newSignalIndex);
  //       }
  //     }
  //   }
  // }


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

import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import alphabet from '../assets/codeTranslationKey';

// -------

// withAutoplay higer-order component takes in Message
// maps over the message and calculate:
// - total words
// - total characters
// - total codeSignals
// creates an array of word arrays, autoplayableMessage, each with:
//  -> an array of character objects, each with:
//    -> the indices of its signals
// returns Message with autoplayableMessage, so it can return Word components formatted for autoplay

// -------


const CanvasMaker = ({ message }) => {
  const signalCount = useRef(0);
  const canvasRef = useRef(null);
  // const [isComplete, setIsComplete] = useState(false);
  // const [activeWordIndex, setActiveWordIndex] = useState(0);
  // const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  // const [activeSignalIndex, setActiveSignalIndex] = useState(0);


  const makeCharacter = (char) => {
    const character = {
      letter: char,
      sequence: alphabet[char].sequence,
      characterIndices: [],
    };
    return character;
  };

  const replaceChars = (list) => {
    for (let thisWordIndex = 0; thisWordIndex < list.length; thisWordIndex += 1) {
      const thisWord = list[thisWordIndex];
      const wordLength = list[thisWordIndex].length;
      for (let thisLetterIndex = 0; thisLetterIndex < wordLength; thisLetterIndex += 1) {
        const thisLetter = thisWord[thisLetterIndex];
        const char = makeCharacter(thisLetter);
        const sequenceLength = char.sequence.length;
        thisWord.splice(thisLetterIndex, 1, char);
        for (let thisSequenceIndex = 0; thisSequenceIndex < sequenceLength; thisSequenceIndex += 1) {
          thisWord[thisLetterIndex].characterIndices.push(signalCount.current);
          signalCount.current += 1;
        }
      }
    }
    return list;
  };

  const wordList = (msg) => {
    const list = msg
      .split(' ')
      .map((word) => word.split(''));
    return list;
  };
  const autoplayableMessage = replaceChars(wordList(message));


  console.log('autoplayableMessage: ', autoplayableMessage);

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: '2px solid' }} />
      <button>Click Me. I don't do anything.</button>
      {/* <Message
        activeSignalIndexForCanvas={activeSignalIndex}
        activeCharacterIndexForCanvas={activeCharacterIndex}
        activeWordIndexForCanvas={activeWordIndex}
        isComplete={isComplete}
      /> */}
    </div>
  );
};

export default CanvasMaker;

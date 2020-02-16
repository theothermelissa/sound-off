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
  const [activeIndex, setActiveIndex] = useState(0);


  const wordList = (msg) => {
    const list = msg
      .split(' ')
      .map((word) => word.split(''));
    return list;
  };

  const makeChar = (char) => {
    const character = {
      letter: char,
      sequence: alphabet[char].sequence,
      characterIndices: [],
    };
    return character;
  };

  const replaceChars = (list) => {
    for (let wordIndex = 0; wordIndex < list.length; wordIndex += 1) {
      const thisWord = list[wordIndex];
      const wordLength = list[wordIndex].length;
      for (let letterIndex = 0; letterIndex < wordLength; letterIndex += 1) {
        const thisLetter = thisWord[letterIndex];
        const char = makeChar(thisLetter);
        thisWord.splice(letterIndex, 1, char);
        for (let sequenceIndex = 0; sequenceIndex < char.sequence.length; sequenceIndex += 1) {
          thisWord[letterIndex].characterIndices.push(signalCount.current);
          signalCount.current += 1;
        }
      }
    }
    return list;
  };


  let autoplayableMessage = [];

  useEffect(() => {
    autoplayableMessage = replaceChars(wordList(message));
  }, []);
  console.log('autoplayableMessage: ', autoplayableMessage);

  useEffect(() => {
    let active = 0;
    let timer = setTimeout(function increment() {
      if (active < signalCount.current) {
        active += 1;
        console.log('active: ', active);
        timer = setTimeout(increment, 500);
      }
    }, 500);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: '2px solid' }} />
      <button>Click Me. I don't do anything.</button>
      <Message
        autoplayableMessage={autoplayableMessage}
        activeSignalIndexForCanvas={activeIndex}
      />
    </div>
  );
};

export default CanvasMaker;

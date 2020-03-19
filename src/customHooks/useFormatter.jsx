import React, { useRef } from 'react';
import alphabet from '../assets/codeTranslationKey';

const useFormatter = (message) => {
  const signalCount = useRef(0);

  const wordList = () => {
    const list = message
      .split(' ')
      .map((word) => word.split(''));
    return list;
  };

  const makeChar = (char) => {
    const character = {
      letter: char,
      sequence: alphabet[char.toLowerCase()].sequence,
      characterIndices: [],
      inWord: '',
      wordLength: '',
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
          thisWord[letterIndex].inWord = wordIndex;
          thisWord[letterIndex].wordLength = wordLength;
          signalCount.current += 1;
        }
      }
    }
    return list;
  };

  return {
    formattedMessage: replaceChars(wordList()),
    totalSignals: signalCount.current,
  };
};

export default useFormatter;

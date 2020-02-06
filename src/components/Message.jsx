import React, { useState, useEffect, useContext } from 'react';
import Word from './Word';
import { GameContext } from './GameMaster';

const Message = () => {
  const {
    gameDispatch,
    gameState: {
      userSubmittedMessage,
      isBegun,
    },
  } = useContext(GameContext);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const wordList = userSubmittedMessage.split(' ');
  const totalWords = wordList.length;

  const onCompleteWord = () => {
    const newIndex = activeWordIndex + 1;
    if (newIndex < totalWords) {
      gameDispatch({
        type: 'resetSignal',
      });
      setActiveWordIndex(newIndex);
    } else {
      setActiveWordIndex(0);
      setTimeout(() => gameDispatch({
        type: 'complete',
      }), 320);
    }
  };

  useEffect(() => {
    if (!isBegun) {
      setActiveWordIndex(0);
    }
  }, [isBegun]);

  return (
    wordList.map((word, index) => (
      <div className="wordHolder" key={word + index}>
        <Word
          characterList={word.split('')}
          activeWordIndex={activeWordIndex}
          wordPosition={index}
          completeWord={onCompleteWord}
        />
      </div>
    ))
  );
};

export default Message;

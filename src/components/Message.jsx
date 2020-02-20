import React, { useState, useEffect, useRef, useContext } from 'react';
import Word from './Word';
import useFormatter from '../customHooks/useFormatter';
import { GameContext } from './GameMaster';

const Message = ({
  activeSignalIndexForCanvas,
  canvasMessageIsComplete,
  reduceBy,
}) => {
  const {
    gameDispatch,
    gameState: {
      isBegun,
    },
  } = useContext(GameContext);
  const formattedMessage = useRef(useFormatter().formattedMessage);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const totalWords = formattedMessage.current.length;

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
    formattedMessage.current.map((word, index) => (
      <div className="wordHolder" key={word + index}>
        <Word
          characterList={word}
          activeWordIndex={activeWordIndex}
          activeSignalIndexForCanvas={activeSignalIndexForCanvas}
          canvasMessageIsComplete={canvasMessageIsComplete}
          wordPosition={index}
          completeWord={onCompleteWord}
          reduceBy={reduceBy}
        />
      </div>
    ))
  );
};

export default Message;

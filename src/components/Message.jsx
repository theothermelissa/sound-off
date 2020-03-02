import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import Word from './Word';
import { GameContext } from './GameMaster';

const Message = ({
  activeSignalIndexForCanvas,
  canvasMessageIsComplete,
}) => {
  const {
    gameDispatch,
    gameState: {
      isBegun,
      formattedMessage,
    },
  } = useContext(GameContext);
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const totalWords = formattedMessage.length;

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
    formattedMessage && formattedMessage.map((word, index) => (
      <div className="wordHolder" key={word + index}>
        <Word
          characterList={word}
          activeWordIndex={activeWordIndex}
          activeSignalIndexForCanvas={activeSignalIndexForCanvas}
          canvasMessageIsComplete={canvasMessageIsComplete}
          wordPosition={index}
          completeWord={onCompleteWord}
          // reduceBy={reduceBy}
        />
      </div>
    ))
  );
};

export default Message;

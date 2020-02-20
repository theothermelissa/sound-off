import React, { useState, useEffect, useContext } from 'react';
import Prompt from './Prompt';
import { GameContext } from './GameMaster';
import CanvasLetterMaker from './CanvasLetterMaker';

const Word = ({
  characterList,
  activeSignalIndexForCanvas,
  canvasMessageIsComplete,
  wordPosition,
  activeWordIndex,
  completeWord,
  reduceBy,
}) => {
  const {
    gameDispatch,
    gameState: {
      isBegun,
      isSendable,
    },
  } = useContext(GameContext);

  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const totalCharacters = characterList.length;

  const onCompletePrompt = () => {
    const newIndex = activeCharacterIndex + 1;
    if (newIndex < totalCharacters) {
      gameDispatch({
        type: 'resetSignal',
      });
      setActiveCharacterIndex(newIndex);
    } else {
      completeWord();
      setActiveCharacterIndex(0);
    }
  };

  useEffect(() => {
    if (!isBegun) {
      setActiveCharacterIndex(0);
    }
  }, [isBegun]);

  return (
    characterList.map((letter, index) => (
      <div key={letter.letter + index}>
        { isSendable
          ? (
            <CanvasLetterMaker
              char={letter}
              activeSignalIndex={activeSignalIndexForCanvas}
              id={wordPosition + letter.letter + index}
              canvasMessageIsComplete={canvasMessageIsComplete}
              reduceBy={reduceBy}
            />
          )
          : (
            <Prompt
              char={letter.letter}
              characterPosition={index}
              activeCharacterIndex={activeCharacterIndex}
              wordPosition={wordPosition}
              activeWordIndex={activeWordIndex}
              completePrompt={onCompletePrompt}
            />
          )}
      </div>
    ))
  );
};

export default Word;

import React, { useState, useEffect, useContext } from 'react';
import Prompt from './Prompt';
import { GameContext } from './GameMaster';
import CanvasLetterMaker from './CanvasLetterMaker';

const Word = ({
  characterList,
  activeWordIndex,
  activeWordIndexForCanvas,
  activeSignalIndexForCanvas,
  activeCharacterIndexForCanvas,
  wordPosition,
  completeWord,
  canvasIsComplete,
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
      <div key={letter + index}>
        { isSendable
          ? (
            <CanvasLetterMaker
              char={letter}
              characterPosition={index}
              wordPosition={wordPosition}
              activeWordIndex={activeWordIndexForCanvas}
              activeCharacterIndex={activeCharacterIndexForCanvas}
              activeSignalIndex={activeSignalIndexForCanvas}
              canvasIsComplete={canvasIsComplete}
            />
          )
          : (
            <Prompt
              char={letter}
              characterPosition={index}
              activeCharacterIndex={activeCharacterIndex}
              wordPosition={wordPosition}
              completePrompt={onCompletePrompt}
            />
          )}
      </div>
    ))
  );
};

export default Word;

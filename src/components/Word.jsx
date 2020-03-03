import React, { useState, useEffect, useContext } from 'react';
import Prompt from './Prompt';
import { GameContext } from './GameMaster';
import { SettingsContext } from '../App';
import CanvasLetterMaker from './CanvasLetterMaker';

const Word = ({
  characterList,
  activeSignalIndexForCanvas,
  canvasMessageIsComplete,
  wordPosition,
  activeWordIndex,
  completeWord,
  // reduceBy,
}) => {
  // console.log('reduceBy: ', reduceBy);
  const {
    gameDispatch,
    gameState: {
      isBegun,
    },
  } = useContext(GameContext);
  const {
    settingsState: {
      isSendable,
    },
  } = useContext(SettingsContext);

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

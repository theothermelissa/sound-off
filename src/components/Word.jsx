import React, { useState, useEffect, useContext } from 'react';
import Prompt from './Prompt';
import { GameContext } from './GameMaster';

const Word = (props) => {
  const {
    gameDispatch,
    gameState: {
      isBegun,
    },
  } = useContext(GameContext);
  const {
    characterList,
    activeWordIndex,
    wordPosition,
    completeWord,
  } = props;
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
        <Prompt
          char={letter}
          characterPosition={index}
          activeCharacterIndex={activeCharacterIndex}
          wordPosition={wordPosition}
          activeWordIndex={activeWordIndex}
          completePrompt={onCompletePrompt}
        />
      </div>
    ))
  );
};

export default Word;

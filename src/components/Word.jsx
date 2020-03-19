import React, { useState, useEffect, useContext } from 'react';
import Prompt from './Prompt';
import { GameContext } from './GameMaster';

const Word = ({
  characterList,
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
        <Prompt
          char={letter.letter}
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

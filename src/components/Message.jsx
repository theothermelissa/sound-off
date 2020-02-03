import React, { useState, useEffect, useContext } from 'react';
import Prompt from './Prompt';
import { GameContext } from './GameMaster';

const Message = () => {
  const {
    gameDispatch,
    gameState: {
      userSubmittedMessage,
      isBegun,
    },
  } = useContext(GameContext);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const characterList = userSubmittedMessage.split('');
  const totalCharacters = characterList.length;
  const isSpace = (char) => char === ' ' || char === '   ';

  const onCompletePrompt = () => {
    const newIndex = activeCharacterIndex + 1;
    if (newIndex < totalCharacters) {
      gameDispatch({
        type: 'resetSignal',
      });
      setActiveCharacterIndex(newIndex);
      if (isSpace(characterList[newIndex])) {
        gameDispatch({
          type: 'resetSignal',
        });
        setActiveCharacterIndex(newIndex + 1);
      }
    } else {
      setActiveCharacterIndex(0);
      setTimeout(() => gameDispatch({
        type: 'complete',
      }), 320);
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
          position={index}
          activeCharacterIndex={activeCharacterIndex}
          completePrompt={onCompletePrompt}
          key={letter + index}
        />
      </div>
    ))
  );
};

export default Message;

import React, { useState, useEffect, useContext } from 'react';
import Prompt from './Prompt';
import { GameContext } from './GameMaster';

const Message = () => {
  const { gameDispatch, gameState: { userSubmittedMessage } } = useContext(GameContext);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const characterList = userSubmittedMessage.split("");
  const totalCharacters = characterList.length;
  const isSpace =(char) => char === " " || char === "   ";

  useEffect(() => {
    setActiveCharacterIndex(0);
  }, [userSubmittedMessage]);

  const onCompletePrompt = () => {
    let newIndex = activeCharacterIndex + 1;
    if (newIndex < totalCharacters) {
      setActiveCharacterIndex(newIndex);
      gameDispatch({
        type: "resetSignal"
      })
      if (isSpace(characterList[newIndex])) {
        setActiveCharacterIndex(newIndex + 1);
        gameDispatch({
          type: "resetSignal"
        })
      }
    } else {
      setActiveCharacterIndex(0);
      setTimeout(() => gameDispatch({
        type: "complete"
      }), 320);
    }
  };

  return (
    characterList.map((letter, index) => {
      return (
        <div key={letter+index}>
          <Prompt 
            char={letter}
            position={index}
            activeCharacterIndex={activeCharacterIndex}
            completePrompt={onCompletePrompt}
            key={letter+index}
          />
        </div>
      )
    }) 
  )
};

export default Message;

import React, { useState, useEffect, useContext } from 'react';
import Prompt from './Prompt';
import { GameContext } from "./GameMaster";

const Message = () => {
  const context = useContext(GameContext);
  const userSubmittedMessage = context.gameState.userSubmittedMessage;
  const dispatch = context.gameDispatch;
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
      dispatch({
        type: "resetSignal"
      })
      if (isSpace(characterList[newIndex])) {
        setActiveCharacterIndex(newIndex + 1);
        dispatch({
          type: "resetSignal"
        })
      }
    } else {
      setActiveCharacterIndex(0);
      dispatch({
        type: "complete"
      });
    }
  };

  return (
    characterList.map((letter, index) => {
      return (
        <div className="promptContainer" key={letter+index}>
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

  // return (
  //   messageCharacters.map((letter, index) => {
  //     return (
  //         <Prompt 
  //           char={letter}
  //           position={index}
  //           activeCharacterIndex={activeCharacterIndex}
  //           completePrompt={onCompletePrompt}
  //           key={letter+index}
  //         />
  //     )
  //   })
  // )
};

export default Message;

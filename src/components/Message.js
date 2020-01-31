import React, { useState, useEffect, useContext } from 'react';
// import Prompt from './Prompt';
import { GameContext } from "./GameMaster"

const Message = () => {
  const context = useContext(GameContext);
  const userSubmittedMessage = context.gameState.userSubmittedMessage;
  const dispatch = context.gameDispatch;
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const characterList = userSubmittedMessage.split("");
  const totalCharacters = characterList.length;
  const isSpace =(char) => char === " " || char === "   ";

  console.log("Active character index: ", activeCharacterIndex)

  useEffect(() => {
    setActiveCharacterIndex(0);
  }, [userSubmittedMessage]);

  const onCompletePrompt = () => {
    let newIndex = activeCharacterIndex + 1;
    if (newIndex < totalCharacters) {
      setActiveCharacterIndex(newIndex);
      if (isSpace(characterList[newIndex])) {
        setActiveCharacterIndex(newIndex + 1);
      }
    } else {
      setActiveCharacterIndex(0);
      setTimeout(dispatch({
        type: "complete"
      }), 600);
    }
  };

  return (
    characterList.map((letter, index) => {
      return (
        <GameContext.Provider>
          <div className="promptContainer">
            <button onClick={onCompletePrompt}>{letter}</button>
            {/* <Prompt 
              char={letter}
              position={index}
              activeCharacterIndex={activeCharacterIndex}
              completePrompt={completePrompt}
              key={letter+index}
            /> */}
          </div>
        </GameContext.Provider>
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

import React, { useState, useEffect, useContext } from 'react';
import Prompt from './Prompt';
import { gameDispatch } from "./GameMaster"

const Message = ({ userSubmittedMessage }) => {
  const dispatch = useContext(gameDispatch);
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const messageCharacters = userSubmittedMessage.split("");
  const totalCharacters = messageCharacters.length;
  console.log("Active Character Index: ", activeCharacterIndex)

  const isSpace =(char) => {
    return (char === " " || char === "   ");
  };

  useEffect(() => {
    setActiveCharacterIndex(0);
  }, [userSubmittedMessage]);

  const onCompletePrompt = () => {
    let newIndex = activeCharacterIndex + 1;
    if (newIndex < totalCharacters) {
      setActiveCharacterIndex(newIndex);
      if (isSpace(messageCharacters[newIndex])) {
        setActiveCharacterIndex(newIndex + 1);
      }
    } else {
      setActiveCharacterIndex(0);
      setTimeout(gameDispatch({
        type: "complete"
      }), 600);
    }
  };

  return (
    messageCharacters.map((letter, index) => {
      return (
        <button onClick={onCompletePrompt} key={letter+index}>{letter}</button>
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

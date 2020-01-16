import React, { useState, useEffect } from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';

const Sequence = ({ char, activeCharacterIndex, lastSignalReceived, position, completeSequence, resetLastSignal, promptIsComplete }) => {
  const [currentSignalIndex, setCurrentSignalIndex] = useState(0);
  const [sequenceIsComplete, setSequenceIsComplete] = useState(false);

//   React.useEffect(() => {
//     fetch('https://pokeapi.co/api/v2/pokemon/gengar/')
//     .then(res => res.json())
//     .then(res => {
//         setPokemon(res)
//     })
// }, []) 
useEffect(() => {
  let newIndex = currentSignalIndex +1;
  if (lastSignalReceived) {
    if (position === activeCharacterIndex) {
      if (newIndex < totalSignalsInChar) {
      setCurrentSignalIndex(newIndex);
      resetLastSignal();
    } else {
      setSequenceIsComplete(true);
      setCurrentSignalIndex(0);
      completeSequence(currentSignalIndex)};
      resetLastSignal();
    }
  }
  }, [lastSignalReceived]);

  const morseElementSequence = alphabet[char.toLowerCase()]["sequence"];
  const totalSignalsInChar = morseElementSequence.length;

  // console.log("Is the ", position, " sequence complete? ", sequenceIsComplete)

  // const isMatch = (signal, target) => {
  //   return (signal === target) ? true : false
  // }



  const onCompleteSignal = () => {
    // console.log("The ", currentSignalIndex, " button has been clicked.")
  };

  const isComplete = (index) => (index < currentSignalIndex) || sequenceIsComplete || promptIsComplete;

  return (
    morseElementSequence.map((codeSignal, index) => {
      return (
        <div className={`${codeSignal.id} ${(isComplete(index)) ? 'completed' : ''}`} key={char + codeSignal.id + index} onClick={onCompleteSignal} />
      )
    })
  )
};
  
  export default Sequence;

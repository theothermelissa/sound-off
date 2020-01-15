import React, { useState } from 'react';
// import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';
// import signalElements from '../assets/signalElements';


// const morseElementSequence = alphabet[char.toLowerCase()]["sequence"];
// const checkSignal = () => {
  // }
  
  // const updateCount = () => {
    //   let newCount = count + 1;
  //   if (charStatus === "active") {
    //     if (newCount > 1) {
  //       completeSignal(charPosition);
  //       setCount("complete");
  //     } else {
    //       setCount(newCount)
    //     };
    //   };
    //   }

    // .map((element, index) => { 
      //     return (
        //       <div 
//         activeElementIndex={activeElementIndex}
//         charStatus={charStatus}
//         className={element.id}
//         key={element.id + char + index}>
//       </div>
//     )
//   })
// };

// const Sequence = ({ char, position, activeCharacterIndex, completeCharacterSignal }) => {
  //   const [activeSignalIndex, setActiveSignalIndex] = useState[0];
  //   const [color, setColor] = useState["green"]
  //   const codeSequence = alphabet[char.toLowerCase()]["sequence"];
  //   const totalCharacterSignals = codeSequence.length;
  //   const activeStatus = (position === activeCharacterIndex) ? "active" : "inactive";
  
  
const Sequence = ({ char, position, activeCharacterIndex, completeSequence, totalCharacters }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log("Sequence position: ", position)

  const clickButton = () => {
    let newIndex = currentIndex +1;
    if (newIndex < totalCharacters) {
      console.log("The", char, " button has been clicked.")
      console.log("Sequence: activeCharacterIndex: ", activeCharacterIndex)
      setCurrentIndex(currentIndex + 1);
      completeSequence();
    }
  }

  return (
    <button onClick={clickButton}>
    {char}
  </button>
)
};
  
  export default Sequence;
  
  //   const markComplete = (index) => {
    //     if (activeStatus === "active") {
      //       let newIndex = index + 1;
//       if (newIndex < totalCharacterSignals) {
  //         setColor("yellow");
//         setActiveSignalIndex(activeSignalIndex + 1)
//       } else {
//         setColor("red");
//         completeCharacterSignal()
//       }
//     }
//   }

//   return (
//     codeSequence.map((characterSignal, index) => {
//       return (
//         <button
//           // className={characterSignal.id}
//           color={color}
//           onClick={markComplete}
//         >

//           </button>
//       )
//     })
//   )
// };

// export default Sequence;
import React, { useState } from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';
import signalElements from '../assets/signalElements';



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
        
        
        // const Sequence = ({ char, position, activeCharacterIndex, completeCharacterSignal }) => {
          //   const [activeSignalIndex, setActiveSignalIndex] = useState[0];
          //   const [color, setColor] = useState["green"]
          //   const codeSequence = alphabet[char.toLowerCase()]["sequence"];
          //   const totalCharacterSignals = codeSequence.length;
          //   const activeStatus = (position === activeCharacterIndex) ? "active" : "inactive";
          
          // const checkSignal = () => {
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

const Sequence = ({ char, position, activeCharacterIndex, completeSequence, totalCharacters }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log("Sequence position: ", position)
  const morseElementSequence = alphabet[char.toLowerCase()]["sequence"];
  
  const clickButton = () => {
    console.log("The ", {char}, " button has been clicked.")
    let newIndex = currentIndex +1;
    if (newIndex < totalCharacters) {
      setCurrentIndex(currentIndex + 1);
      completeSequence();
    }
  }

  const isComplete = (position < activeCharacterIndex);

  // className={`post-wrapper ${this.state.loading ? 'post-wrapper--loading' : ''}`}

  return (
    morseElementSequence.map((codeSignal, index) => {
      return (
        <div className={`${codeSignal.id} ${isComplete ? 'completed' : ''}`} key={char + codeSignal.id + index} onClick={clickButton} />
      )
    })
  //   <button onClick={clickButton}>
  //   {char}
  // </button>
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
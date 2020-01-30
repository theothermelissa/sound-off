import React, { Component, useReducer, useContext, useCallback } from 'react';
import '../App.css';
// import Message from './Message';
import Switch from './Switch';
// import CreateMessage from './CreateMessage';
// import ScoreKeeper from './ScoreKeeper';
// import Timer from './Timer';

export const GameContext = React.createContext(null)

const initialState = {
  userSubmittedMessage: "Hello world",
  signalStartTimes: [],
  signalEndTimes: [],
  lastSignalReceived: "",
  isError: false,
  totalErrors: 0,
  isComplete: false,
  isActive: false,
}

const reducer = (state, action) => {
  console.log("Dispatch activated.")
  switch (action.type) {
    case "error":
      return {
        ...state,
        isError: true,
        lastSignalReceived: "error",
        signalStartTimes: [...state.signalStartTimes, action.startTime],
        signalEndTimes: [...state.signalEndTimes, action.endTime]
      };
    case "dot":
      return {
        lastSignalReceived: "dot",
        signalStartTimes: [...state.signalStartTimes, action.startTime],
        signalEndTimes: [...state.signalEndTimes, action.endTime]
      };
    case "dash":
      return {
        lastSignalReceived: "dash",
        signalStartTimes: [...state.signalStartTimes, action.startTime],
        signalEndTimes: [...state.signalEndTimes, action.endTime]
      };
    case "reset":
      return {
        userSubmittedMessage: action.newMessage,
        signalStartTimes: [],
        signalEndTimes: [],
        lastSignalReceived: "",
        isError: false,
        totalErrors: 0,
        isComplete: false,
        isActive: false,
      }
    case "complete":
      return {
        ...state,
        isComplete: true,
        isActive: false,
      }
    default:
      throw new Error("Unknown signal");
  }
};

const GameMaster = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const onTransmit = useCallback(
  //   (signalType, timeBegun, timeConcluded) => dispatch({ type: signalType, startTime: timeBegun, endTime: timeConcluded })
  // )
  return (
    <GameContext.Provider 
      value={{
        state,
        dispatch
      }}
    >
      <div className="SignalInfo">
        {state.isComplete ? (
          <>
            <div>Game is complete.</div>
          </>
        ) : (
          <>
            <div>Game is not complete.</div>
          </>
        )}
        {state.signalStartTimes[0] && !state.isComplete ? (
          <>
            <div>Game is active.</div>
          </>
        ) : (
          <>
            <div>Game is not active.</div>
          </>
        )}
        <div>Last signal was {state.lastSignalReceived} at {JSON.stringify(state.signalStartTimes)}</div>
        <button onClick={() => dispatch({ type: "reset"})}>reset</button>
        <button onClick={() => dispatch({ type: "complete"})}>complete</button>
        <Switch />
      </div>
    </GameContext.Provider>
  )
}


// class GameMaster extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userSubmittedMessage: "Hello world",
//       isBegun: false,
//       isComplete: false,
//       isError: false,
//       lastSignalReceived: "",
//       signalStartTimes: 0,
//       signalEndTime: 0,
//       durationOfTransmission: 0,
//     };
//     this.onCompleteMessage = this.onCompleteMessage.bind(this);
//     this.resetLastSignal = this.resetLastSignal.bind(this);
//     this.transmitSignal = this.transmitSignal.bind(this);
//     this.transmitInputDuration = this.transmitInputDuration.bind(this);
//     this.logError = this.logError.bind(this);
//     this.submitNewMessage = this.submitNewMessage.bind(this);
//   };

//   onCompleteMessage = () => {
//     this.setState({ isComplete: true });
//     setTimeout(this.setState({
//       userSubmittedMessage: "Hello again, world",
//       isBegun: false,
//       isComplete: false,
//       isError: false,
//       lastSignalReceived: "",
//       signalStartTimes: 0,
//       signalEndTime: 0,
//       durationOfTransmission: 0,
//     }), 400)
//   };

//   resetLastSignal = () => {
//     this.setState({
//       lastSignalReceived: "",
//       isError: false,
//     })
//   };

//   transmitInputDuration = (time) => {
//     this.setState({ durationOfTransmission: time});
//   };

//   transmitSignal = (signal, startTime, endTime) => {
//     if (this.state.isBegun === false) { 
//       this.setState({ isBegun: true }) 
//     };
//     this.setState({ 
//       lastSignalReceived: signal,
//       signalStartTimes: startTime,
//       signalEndTime: endTime,
//     })
//   };

//   logError = () => {
//     this.setState({
//       isError: true,
//     })
//   }

//   // transmitStartTime = (time) => {
//     //   this.setState({ timeLastSignalBegan: time })
//     //   if (this.state.signalsReceived === 0) {
//       //     this.setState({ 
//         //       timeFirstSignalBegan: time,
//         //     })
//         //   }
//         // };

//   // transmitEndTime = (time) => {
//     //   this.setState({ 
//       //     timeLastSignalEnded: time, 
//       //   })
//       // };

//   submitNewMessage = (message) => {
//     this.setState({ 
//       userSubmittedMessage: message,
//       isBegun: false,
//       isComplete: false,
//       isError: false,
//       lastSignalReceived: "",
//       signalStartTimes: 0,
//       signalEndTime: 0,
//       durationOfTransmission: 0,
//     });
//   }

//   render() {
//     return (
//       <div className="game">
//         <div className="messageHolder">
//           <Message 
//             userSubmittedMessage={this.state.userSubmittedMessage}
//             completeMessage={this.onCompleteMessage}
//             resetLastSignal={this.resetLastSignal}
//             isComplete={this.state.isComplete}
//             isBegun={this.state.isBegun}
//             lastSignalReceived={this.state.lastSignalReceived}
//             logError={this.logError}
//           />
//         </div>
//         <Switch
//           transmitSignal={this.transmitSignal}
//         />
//         <CreateMessage 
//           submitNewMessage={this.submitNewMessage}
//           // currentMessage={this.state.userSubmittedMessage}
//         />
//         {/* <Timer transmitInputDuration={this.state.transmitInputDuration} /> */}
//         <ScoreKeeper 
//           userSubmittedMessage={this.state.userSubmittedMessage}
//           isError={this.state.isError}
//           isComplete={this.state.isComplete}
//           durationOfTransmission={this.durationOfTransmission}
//           signalStartTimes={this.state.signalStartTimes}
//           isBegun={this.state.isBegun}
//         />
//           {/* <button onClick={this.toggleTimer}>Start/Stop Timer</button> */}
//           {/* <Timer isComplete={this.state.isComplete} /> */}
//       </div>
//     )
//   }
// };

export default GameMaster;

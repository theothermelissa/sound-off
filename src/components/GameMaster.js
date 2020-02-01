import React, { Component, useReducer, useContext, useCallback } from 'react';
import '../App.css';
import Message from './Message';
import Switch from './Switch';
import receiverReducer from '../reducers/receiverReducer'
import CreateMessage from './CreateMessage';
import ScoreKeeper from './ScoreKeeper';
// import Timer from './Timer';

export const GameContext = React.createContext(null);
export const GameDispatch = React.createContext(null);

const initialState = {
  userSubmittedMessage: "Potato",
  signalStartTimes: [],
  signalEndTimes: [],
  lastSignalReceived: "",
  isError: false,
  totalErrors: 0,
  isComplete: false,
}

const GameMaster = () => {
  const [gameState, gameDispatch] = useReducer(receiverReducer, initialState);
  return (
    <GameContext.Provider 
    value={{
      gameState,
      gameDispatch
    }}
    >
      <div className="game">
      <ScoreKeeper />
        <div className="messageHolder">
          <Message />
        </div>
        <div className="switchContainer">
          <Switch />
        </div>
        <CreateMessage />
      </div>
    </GameContext.Provider>
  )
}

export default GameMaster;

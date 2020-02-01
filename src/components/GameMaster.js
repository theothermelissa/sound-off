import React, { Component, useReducer, useContext, useCallback } from 'react';
import '../App.css';
import Message from './Message';
import Switch from './Switch';
import receiverReducer from '../reducers/receiverReducer'
import ScoreKeeper from './ScoreKeeper';
// import Timer from './Timer';

// SIVT25-A01-180609-DA
// EMC FCC 120V/60HZ/3000W/3800/IV0331

// hours

export const GameContext = React.createContext(null);
export const GameDispatch = React.createContext(null);

const initialState = {
  userSubmittedMessage: "Hello world",
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
        <div className="messageHolder">
          <Message />
        </div>
      {gameState.isComplete
        ? <ScoreKeeper />
        : null
      }
        <div className="switchContainer">
          <Switch />
        </div>
      </div>
    </GameContext.Provider>
  )
}

export default GameMaster;

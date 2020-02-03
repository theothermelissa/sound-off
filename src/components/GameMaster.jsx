import React, { useReducer } from 'react';
import '../App.css';
import Message from './Message';
import Switch from './Switch';
import receiverReducer from '../reducers/receiverReducer';
import ScoreKeeper from './ScoreKeeper';

export const GameContext = React.createContext(null);
export const GameDispatch = React.createContext(null);

const initialState = {
  userSubmittedMessage: 'it',
  signalStartTimes: [],
  signalEndTimes: [],
  lastSignalReceived: '',
  isError: false,
  totalErrors: 0,
  isComplete: false,
  isBegun: false,
};

const GameMaster = () => {
  const [gameState, gameDispatch] = useReducer(receiverReducer, initialState);
  return (
    <GameContext.Provider
      value={{
        gameState,
        gameDispatch,
      }}
    >
      <div className="game">
        <div className="messageHolder">
          <Message />
        </div>
        { gameState.isComplete && <ScoreKeeper /> }
        <div className="switchContainer">
          <Switch />
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default GameMaster;

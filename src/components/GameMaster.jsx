import React, { useReducer, useState } from 'react';
import '../App.css';
import Message from './Message';
import Switch from './Switch';
import receiverReducer from '../reducers/receiverReducer';
import ScoreKeeper from './ScoreKeeper';
import ResetSpinner from './ResetSpinner.jsx';

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
  const [shouldRun, setShouldRun] = useState(false);
  const toggleAnimation = () => {
    if (shouldRun) {
      setShouldRun(false);
    } else {
      setShouldRun(true);
    }
  };
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
          <button type="button" onClick={toggleAnimation}>Toggle Animation</button>
          <ResetSpinner
            radius="75"
            stroke="20"
            shouldRun={shouldRun}
          />
        </div>
      </div>
    </GameContext.Provider>
  );
};

export default GameMaster;

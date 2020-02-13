import React, { useReducer, useState } from 'react';
import Message from './Message';
import Switch from './Switch';
import receiverReducer from '../reducers/receiverReducer';
import ScoreKeeper from './ScoreKeeper';
import Menu from './Menu';
import Light from './Light';
import CanvasMaker from './CanvasMaker';

export const GameContext = React.createContext(null);
export const GameDispatch = React.createContext(null);

const initialState = {
  userSubmittedMessage: 'hello world',
  signalStartTimes: [],
  signalEndTimes: [],
  lastSignalReceived: '',
  isError: false,
  totalErrors: 0,
  isComplete: false,
  isBegun: false,
  isPressed: false,
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
        <CanvasMaker activeCharIndex={1} activeSignalIndex={1} currentCharIndex={1} />
        {/* <Menu />
        <Light on />
        <div className="messageHolder">
          <Message />
        </div>
        { gameState.isComplete && <ScoreKeeper /> }
        <Switch /> */}
      </div>
    </GameContext.Provider>
  );
};

export default GameMaster;

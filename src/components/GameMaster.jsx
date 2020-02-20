import React, { useReducer, useState } from 'react';
import Message from './Message';
import Switch from './Switch';
import receiverReducer from '../reducers/receiverReducer';
import ScoreKeeper from './ScoreKeeper';
import Menu from './Menu';
import Light from './Light';
import SendableMessage from './SendableMessage';
// import CanvasLetterMaker from './CanvasLetterMaker';

export const GameContext = React.createContext(null);
export const GameDispatch = React.createContext(null);

const initialState = {
  userSubmittedMessage: 'I love you',
  signalStartTimes: [],
  signalEndTimes: [],
  lastSignalReceived: '',
  isError: false,
  totalErrors: 0,
  isComplete: false,
  isBegun: false,
  isPressed: false,
  isSendable: true,
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
        <Menu />
        <Light on />
        <div className="messageHolder">
          { gameState.isSendable
            ? <SendableMessage />
            : <Message /> }
        </div>
        { gameState.isComplete && <ScoreKeeper /> }
        <Switch />
      </div>
    </GameContext.Provider>
  );
};

export default GameMaster;

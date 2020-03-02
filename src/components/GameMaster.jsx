import React, { useReducer, useEffect } from 'react';
import Message from './Message';
import Switch from './Switch';
import receiverReducer from '../reducers/receiverReducer';
import ScoreKeeper from './ScoreKeeper';
import Menu from './Menu';
import Light from './Light';
import SendableMessage from './SendableMessage';
import useFormatter from '../customHooks/useFormatter';
// import CanvasLetterMaker from './CanvasLetterMaker';

export const GameContext = React.createContext(null);
export const GameDispatch = React.createContext(null);

const initialState = {
  userSubmittedMessage: 'i t',
  formattedMessage: '',
  totalSignals: '',
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
  const messageWithFormat = useFormatter(initialState.userSubmittedMessage).formattedMessage;
  const totalSignalsInMessage = useFormatter(initialState.userSubmittedMessage).totalSignals;


  useEffect(() => {
    gameDispatch({
      type: 'formatMessage',
      payload: messageWithFormat,
    });
  }, []);

  useEffect(() => {
    gameDispatch({
      type: 'countTotalSignals',
      payload: totalSignalsInMessage,
    });
  }, []);

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
          <Message />
        </div>
        { gameState.isComplete && <ScoreKeeper /> }
        <Switch />
      </div>
    </GameContext.Provider>
  );
};

export default GameMaster;

import React, { useReducer, useEffect } from 'react';
import Message from './Message';
import Switch from './Switch';
import receiverReducer from '../reducers/receiverReducer';
import ScoreKeeper from './ScoreKeeper';
import Menu from './Menu';
import Light from './Light';
import useFormatter from '../customHooks/useFormatter';
// import CanvasLetterMaker from './CanvasLetterMaker';

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
  formattedMessage: '',
};

const GameMaster = () => {
  const [gameState, gameDispatch] = useReducer(receiverReducer, initialState);
  const messageWithFormat = useFormatter(gameState.userSubmittedMessage).formattedMessage;
  const totalSignalsInMessage = useFormatter(gameState.userSubmittedMessage).totalSignals;

  useEffect(() => {
    gameDispatch({
      type: 'formatMessage',
      payload: messageWithFormat,
    });
  }, [gameState.userSubmittedMessage]);

  useEffect(() => {
    console.log('*****', '\n', 'NEED A REACT DEVELOPER?', '\n', "freelance | contract-for-hire | paid internship ", '\n', "github: @theothermelissa", '\n', "linkedin @melissa-p-morgan", '\n', "*****");
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

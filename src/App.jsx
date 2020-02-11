import React, { useReducer } from 'react';
import GameMaster from './components/GameMaster';
import settingsReducer from './reducers/settingsReducer';
import './App.css';

export const SettingsContext = React.createContext(null);
export const SettingsDispatch = React.createContext(null);

const initialState = {
  showLetters: false,
  showSignals: true,
  soundsOn: true,
};

function App() {
  const [settingsState, settingsDispatch] = useReducer(settingsReducer, initialState);

  return (
    <SettingsContext.Provider
      value={{
        settingsState,
        settingsDispatch,
      }}
    >
      <div className="App">
        <GameMaster />
      </div>
    </SettingsContext.Provider>
  );
}

export default App;

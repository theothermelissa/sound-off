import React from 'react';
// import SignalSwitch from './components/SignalSwitch'
import PromptField from './components/PromptField'
// import CurrentJoke from './components/CurrentJoke'
import GameMaster from './components/GameMaster'
import './App.css';

function App() {
  return (
    <div className="App">
      <GameMaster />
      <PromptField />
      {/* <SignalSwitch /> */}
      {/* <CurrentJoke /> */}
    </div>
  );
}

export default App;

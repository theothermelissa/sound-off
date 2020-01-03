import React from 'react';
import SignalSwitch from './components/SignalSwitch'
import PromptField from './components/PromptField'
import CurrentJoke from './components/CurrentJoke'
import './App.css';

function App() {
  return (
    <div className="App">
      <PromptField />
      <SignalSwitch />
      <CurrentJoke />
    </div>
  );
}

export default App;

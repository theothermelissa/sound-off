import React, { useContext } from 'react';
import { SettingsContext } from '../App';

const Menu = () => {
  const { settingsDispatch, settingsState: { showLetters, showSignals } } = useContext(SettingsContext)

  const turnOnLetters = () => (
    settingsDispatch({
      type: 'showLetters',
    })
  );
  const turnOffLetters = () => (
    settingsDispatch({
      type: 'hideLetters',
    })
  );
  const turnOnSignals = () => (
    settingsDispatch({
      type: 'showSignals',
    })
  );
  const turnOffSignals = () => (
    settingsDispatch({
      type: 'hideSignals',
    })
  );

  console.log("showLetters: ", showLetters);
  console.log("showSignals: ", showSignals);
  
  return (
    <div>
      <button onClick={turnOnLetters} type="button">Letters On</button>
      <button onClick={turnOffLetters} type="button">Letters Off</button>
      <button onClick={turnOnSignals} type="button">Signals On</button>
      <button onClick={turnOffSignals} type="button">Signals Off</button>
    </div>
  );
};

export default Menu;

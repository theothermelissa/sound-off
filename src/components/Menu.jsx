import React, { useContext } from 'react';
import { SettingsContext } from '../App';
import ToggleButton from './ToggleButton';

const Menu = () => {
  const { settingsDispatch, settingsState: { showLetters, showSignals } } = useContext(SettingsContext);

  const toggleLetters = () => (
    showLetters
      ? settingsDispatch({
        type: 'hideLetters',
      })
      : settingsDispatch({
        type: 'showLetters',
      })
  );

  const toggleSignals = () => (
    showSignals
      ? settingsDispatch({
        type: 'hideSignals',
      })
      : settingsDispatch({
        type: 'showSignals',
      })
  );

  return (
    <div className="settings">
      <div className="menuBar1" />
      <div className="menuBar2" />
      <div className="menuBar3" />
      <div className="settings-content">
        <div className="control-holder">
          <div className="control-text">Letters</div>
          <ToggleButton isSelected={showLetters} id="lettersToggle" onSelect={toggleLetters} />
        </div>
        <div className="control-holder">
          <div className="control-text">Signals</div>
          <ToggleButton isSelected={showSignals} id="signalsToggle" onSelect={toggleSignals} />
        </div>
      </div>
    </div>
  );
};

export default Menu;

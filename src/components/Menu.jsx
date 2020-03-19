import React, { useContext } from 'react';
import { SettingsContext } from '../App';
import ToggleButton from './ToggleButton';

const Menu = () => {
  const { settingsDispatch, settingsState: { showLetters, showSignals, soundsOn } } = useContext(SettingsContext);

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

  const toggleSounds = () => (
    soundsOn
      ? settingsDispatch({
        type: 'soundsOff',
      })
      : settingsDispatch({
        type: 'soundsOn',
      })
  );

  return (
    <div className="settings">
      <div className="hamburgerWrapper">
        <div className="menuBar1" />
        <div className="menuBar2" />
        <div className="menuBar3" />
        <div className="menuSlider1" />
        <div className="menuSlider2" />
        <div className="menuSlider3" />
      </div>
      <div className="settings-content">
        <div className="control-holder">
          <div className="control-text">Show Letters</div>
          <ToggleButton isSelected={showLetters} id="lettersToggle" onSelect={toggleLetters} />
        </div>
        <div className="control-holder">
          <div className="control-text">Show Signals</div>
          <ToggleButton isSelected={showSignals} id="signalsToggle" onSelect={toggleSignals} />
        </div>
        <div className="control-holder">
          <div className="control-text">Play Sounds</div>
          <ToggleButton isSelected={soundsOn} id="soundsToggle" onSelect={toggleSounds} />
        </div>
        <p className="control-text">To restart this round, press and hold the switch button until the message resets.</p>
      </div>
    </div>
  );
};

export default Menu;

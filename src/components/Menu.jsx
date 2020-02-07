import React, { useContext } from 'react';
import { SettingsContext } from '../App';

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
          <form action="#">
            <div className="toggle">
              <input type="checkbox" className="toggle-input" id="lettersToggle" />
              <label onClick={toggleLetters} htmlFor="lettersToggle" className="toggle-label"></label>
            </div>
          </form>
        </div>
        <div className="control-holder">
          <div className="control-text">Signals</div>
          <form action="#">
            <div className="toggle">
              <input type="checkbox" className="toggle-input" id="signalsToggle" />
              <label onClick={toggleSignals} htmlFor="signalsToggle" className="toggle-label"></label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Menu;

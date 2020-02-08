import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';
import '../App.css';
import { useAudio } from 'react-use';
import soundSignal from '../assets/800hz.mp3';
import signalElements from '../assets/signalElements';
import { GameContext } from './GameMaster';
import ResetSpinner from './ResetSpinner.jsx';

const Switch = () => {
  const { gameDispatch, gameState: { isComplete } } = useContext(GameContext);

  const [switchIsPressed, setSwitchIsPressed] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetCount, setResetCount] = useState(0);
  const [pressTime, setPressTime] = useState(0);

  const [audio, state, controls, ref] = useAudio({
    src: soundSignal,
    autoPlay: false,
  });

  useEffect(() => {
    const newCount = resetCount + 1;
    if (switchIsPressed) {
      if (resetCount === 2) {
        setShowReset(true);
      } if (resetCount === 5) {
        const date = new Date();
        const currentTimestamp = date.getTime();
        gameDispatch({
          type: 'reset',
          startTime: pressTime,
          endTime: currentTimestamp,
        });
        setSwitchIsPressed(false);
        controls.pause();
      }
      const interval = setInterval(() => {
        console.log("Resetting in: ", (5 - newCount));
        setResetCount(newCount);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [switchIsPressed, resetCount]);

  const duration = (start, end) => (end - start) / 1000;

  const determineSignalType = (totalTime, letter) => {
    const dotMin = signalElements.dot.minDuration;
    const dotMax = signalElements.dot.maxDuration;
    const dashMin = signalElements.dash.minDuration;
    const dashMax = signalElements.dash.maxDuration;
    if (letter) {
      return letter;
    } if (dotMin <= totalTime && totalTime <= dotMax) {
      return 'dot';
    } if (dashMin < totalTime && totalTime <= dashMax) {
      return 'dash';
    }
    return 'invalidSignal';
  };


  const onPress = (event) => {
    controls.play();
    setPressTime(event.timeStamp);
    setSwitchIsPressed(true);
  };

  const onRelease = (releaseTime) => {
    setSwitchIsPressed(false);
    controls.pause();
    setShowReset(false);
    setResetCount(0);
    gameDispatch({
      type: determineSignalType(duration(pressTime, releaseTime)),
      startTime: pressTime,
      endTime: releaseTime,
    });
  };

  const listenForKeyCode = useCallback(
    (event) => {
      event.preventDefault();
      const inputCode = event.keyCode;
      gameDispatch({
        type: 'letter',
        payload: inputCode,
      });
    },
  );

  useEffect(() => {
    if (!isComplete) {
      window.addEventListener('keyup', listenForKeyCode);
      return () => {
        window.removeEventListener('keyup', listenForKeyCode);
      };
    }
    return () => {
      window.removeEventListener('keyup', listenForKeyCode);
    };
  }, [isComplete]);

  return (
    <div className="switchContainer">
      {audio}
      { showReset && (
      <ResetSpinner
        radius="75"
        shouldRun={showReset}
      />
      )}
      <div
        id="switch"
        role="button"
        label="switch"
        tabIndex="0"
        onMouseDown={(event) => onPress(event)}
        onMouseUp={(event) => onRelease(event.timeStamp)}
        className={`switchButton${(switchIsPressed) ? ' pressed' : ''}`}
      />
    </div>
  );
};

export default Switch;

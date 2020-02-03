import React, {
  useState, useEffect, useContext, useCallback,
} from 'react';
import '../App.css';
import { useAudio } from 'react-use';
import soundSignal from '../assets/800hz.mp3';
import signalElements from '../assets/signalElements';
import { GameContext } from './GameMaster';

const Switch = () => {
  const { gameDispatch, gameState: { isComplete } } = useContext(GameContext);

  const [pressTime, setPressTime] = useState(0);
  const [switchIsPressed, setSwitchIsPressed] = useState(false);

  const [audio, state, controls, ref] = useAudio({
    src: soundSignal,
    autoPlay: false,
  });


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
    } if (dashMax < totalTime) {
      return 'reset';
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
      console.log('key pressed: ', inputCode);
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
        window.removeEventListener('keyup', listenForKeyCode)
      };
    }
    return () => {
      window.removeEventListener('keyup', listenForKeyCode)
    };
  }, [isComplete]);

  // useEffect(() => {
  //   window.removeEventListener('keyup', listenForKeyCode);
  // });


  return (
    <div className="buttonContainer">
      {audio}
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

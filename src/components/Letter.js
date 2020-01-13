import React from 'react';
import alphabet from '../assets/codeTranslationKey.js';
import '../App.css';
import signalElements from '../assets/signalElements';

const Letter = ({ char, currentClassName }) => {
  return (
  <div className={currentClassName}>{char}</div>
  )};

  export default Letter;

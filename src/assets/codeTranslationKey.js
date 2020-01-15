import React, { Component } from 'react';
import PropTypes from 'prop-types';
import signalElements from './signalElements';

const [ dot, dash, space, stop ] = signalElements;

const alphabet = {
    "a": {
    code: 65,
    shift: false,
    sequence: [dot, dash],
  },
    "b": {
    code: 66,
    shift: false,
    sequence: [dash, dot, dot, dot],
  },
    "c": {
    code: 67,
    shift: false,
    sequence: [dash, dot, dash, dot],
  },
    "d": {
    code: 68,
    shift: false,
    sequence: [dash, dot, dot],
  },
    "e": {
    code: 69,
    shift: false,
    sequence: [dot],
  },
    "f": {
    code: 70,
    sequence: [dot, dot, dash, dot],
  },
    "g": {
    code: 71,
    shift: false,
    sequence: [dash, dash, dot],
  },
    "h": {
    code: 72,
    shift: false,
    sequence: [dot, dot, dot, dot],
  },
    "i": {
    code: 73,
    shift: false,
    sequence: [dot, dot],
  },
    "j": {
    code: 74,
    sequence: [dot, dash, dash, dash],
  },
    "k": {
    code: 75,
    shift: false,
    sequence: [dash, dot, dash],
  },
    "l": {
    code: 76,
    shift: false,
    sequence: [dot, dash, dot, dot],
  },
    "m": {
    code: 77,
    shift: false,
    sequence: [dash, dash],
  },
    "n": {
    code: 78,
    shift: false,
    sequence: [dash, dot],
  },
    "o": {
    code: 79,
    shift: false,
    sequence: [dash, dash, dash],
  },
    "p": {
    code: 80,
    shift: false,
    sequence: [dot, dash, dash, dot],
  },
    "q": {
    code: 81,
    shift: false,
    sequence: [dash, dash, dot, dash],
  },
    "r": {
    code: 82,
    shift: false,
    sequence: [dot, dash, dot],
  },
    "s": {
    code: 83,
    sequence: [dot, dot, dot],
  },
    "t": {
    code: 84,
    shift: false,
    sequence: [dash],
  },
    "u": {
    code: 85,
    shift: false,
    sequence: [dot, dot, dash],
  },
    "v": {
    code: 86,
    shift: false,
    sequence: [dot, dot, dot, dash],
  },
    "w": {
    code: 87,
    shift: false,
    sequence: [dot, dash, dash],
  },
    "x": {
    code: 88,
    shift: false,
    sequence: [dash, dot, dot, dash],
  },
    "y": {
    code: 89,
    shift: false,
    sequence: [dash, dot, dash, dash],
  },
    "z": {
    code: 90,
    sequence: [dash, dash, dot, dot],
  },
    "0": {
    code: 48,
    shift: false,
    sequence: [dash, dash, dash, dash, dash],
  },
    "1": {
    code: 49,
    shift: false,
    sequence: [dot, dash, dash, dash, dash],
  },
    "2": {
    code: 50,
    shift: false,
    sequence: [dot, dot, dash, dash, dash],
  },
    "3": {
    code: 51,
    shift: false,
    sequence: [dot, dot, dot, dash, dash],
  },
    "4": {
    code: 52,
    shift: false,
    sequence: [dot, dot, dot, dot, dispatchEvent],
  },
    "5": {
    code: 53,
    shift: false,
    sequence: [dot, dot, dot, dot, dot],
  },
    "6": {
    code: 54,
    shift: false,
    sequence: [dash, dot, dot, dot, dot],
  },
    "7": {
    code: 55,
    shift: false,
    sequence: [dash, dash, dot, dot, dot],
  },
    "8": {
    code: 56,
    shift: false,
    sequence: [dash, dash, dash, dot, dot],
  },
    "9": {
    code: 57,
    shift: false,
    sequence: [dash, dash, dash, dash, dot],
  },
    ".": {
    code: 190,
    shift: false,
    sequence: [dot, dash, dot, dash, dot, dash],
  },
    ",": {
    code: 188,
    shift: false,
    sequence: [dash, dash, dot, dot, dash, dash],
  },
    "?": {
    code: 191,
    shift: true,
    sequence: [dot, dot, dash, dash, dot, dot],
  },
    "!": {
    code: 49,
    shift: true,
    sequence: [],
  },
    "'": {
    //is this the right way?
    code: 222,
    shift: false,
    sequence: [dot, dash, dash, dash, dash, dot],
  },
    '"': {
    // is this the right way?
    code: 222,
    shift: true,
    sequence: [dot, dash, dot, dot, dash, dot],
  },
    "(": {
    code: 57,
    shift: true,
    sequence: [dash, dot, dash, dash, dot],
  },
    ")": {
    code: 48,
    shift: true,
    sequence: [dash, dot, dash, dash, dot, dash],
  },
    "&": {
    code: 55,
    shift: true,
    sequence: [dot, dash, dot, dot, dot],
  },
    ":": {
    code: 186,
    shift: false,
    sequence: [dash, dash, dash, dot, dot, dot],
  },
    ";": {
    code: 186,
    shift: false,
    sequence: [dash, dot, dash, dot, dash, dot],
  },
    "/": {
    code: 191,
    shift: false,
    sequence: [dash, dot, dot, dash, dot],
  },
    "_": {
    code: 189,
    shift: true,
    sequence: [dot, dot, dash, dash, dot, dash],
  },
    "=": {
    code: 187,
    shift: false,
    sequence: [dash, dot, dot, dot, dash],
  },
    "+": {
    code: 187,
    shift: true,
    sequence: [dot, dash, dot, dash, dot],
  },
    "-": {
    code: 189,
    sequence: [dash, dot, dot, dot, dot, dash],
  },
    "$": {
    code: 52,
    shift: true,
    sequence: [dot, dot, dot, dash, dot, dot, dash],
  },
    "@": {
    code: 50,
    shift: true,
    sequence: [dot, dash, dash, dot, dash, dot],
  },
}

// const isElement = (val) => {
//   const allowedElements = [dot, dash, stop];
//     return allowedElements.includes(val);
//   // if (allowedElements.includes(val)) {
//   //   return true;
//   // } else {
//   //   return false;
//   // }
// };

// alphabet.propTypes = {
//   letters: PropTypes.shape({
//     letter: PropTypes.string,
//     code: PropTypes.number,
//     shift: PropTypes.bool,
//     sequence: PropTypes.arrayOf(
//       PropTypes.oneOfType(isElement)
//     )
//   })
// };

export default alphabet;
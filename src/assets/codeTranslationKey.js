import React, { Component } from 'react';
import PropTypes from 'prop-types';
import signalElements from './signalElements';

const [ dot, dash, space, stop ] = signalElements;

const alphabet = {
    "a": {
    code: 65,
    shift: false,
    sequence: [dot, space, dash],
  },
    "b": {
    code: 66,
    shift: false,
    sequence: [dash, space, dot, space, dot, space, dot],
  },
    "c": {
    code: 67,
    shift: false,
    sequence: [dash, space, dot, space, dash, space, dot],
  },
    "d": {
    code: 68,
    shift: false,
    sequence: [dash, space, dot, space, dot],
  },
    "e": {
    code: 69,
    shift: false,
    sequence: [dot],
  },
    "f": {
    code: 70,
    sequence: [dot, space, dot, space, dash, space, dot],
  },
    "g": {
    code: 71,
    shift: false,
    sequence: [dash, space, dash, space, dot],
  },
    "h": {
    code: 72,
    shift: false,
    sequence: [dot, space, dot, space, dot, space, dot],
  },
    "i": {
    code: 73,
    shift: false,
    sequence: [dot, space, dot],
  },
    "j": {
    code: 74,
    sequence: [dot, space, dash, space, dash, space, dash],
  },
    "k": {
    code: 75,
    shift: false,
    sequence: [dash, space, dot, space, dash],
  },
    "l": {
    code: 76,
    shift: false,
    sequence: [dot, space, dash, space, dot, space, dot],
  },
    "m": {
    code: 77,
    shift: false,
    sequence: [dash, space, dash],
  },
    "n": {
    code: 78,
    shift: false,
    sequence: [dash, space, dot],
  },
    "o": {
    code: 79,
    shift: false,
    sequence: [dash, space, dash, space, dash],
  },
    "p": {
    code: 80,
    shift: false,
    sequence: [dot, space, dash, space, dash, space, dot],
  },
    "q": {
    code: 81,
    shift: false,
    sequence: [dash, space, dash, space, dot, space, dash],
  },
    "r": {
    code: 82,
    shift: false,
    sequence: [dot, space, dash, space, dot],
  },
    "s": {
    code: 83,
    sequence: [dot, space, dot, space, dot],
  },
    "t": {
    code: 84,
    shift: false,
    sequence: [dash],
  },
    "u": {
    code: 85,
    shift: false,
    sequence: [dot, space, dot, space, dash],
  },
    "v": {
    code: 86,
    shift: false,
    sequence: [dot, space, dot, space, dot, space, dash],
  },
    "w": {
    code: 87,
    shift: false,
    sequence: [dot, space, dash, space, dash],
  },
    "x": {
    code: 88,
    shift: false,
    sequence: [dash, space, dot, space, dot, space, dash],
  },
    "y": {
    code: 89,
    shift: false,
    sequence: [dash, space, dot, space, dash, space, dash],
  },
    "z": {
    code: 90,
    sequence: [dash, space, dash, space, dot, space, dot],
  },
    "0": {
    code: 48,
    shift: false,
    sequence: [dash, space, dash, space, dash, space, dash, space, dash],
  },
    "1": {
    code: 49,
    shift: false,
    sequence: [dot, space, dash, space, dash, space, dash, space, dash],
  },
    "2": {
    code: 50,
    shift: false,
    sequence: [dot, space, dot, space, dash, space, dash, space, dash],
  },
    "3": {
    code: 51,
    shift: false,
    sequence: [dot, space, dot, space, dot, space, dash, space, dash],
  },
    "4": {
    code: 52,
    shift: false,
    sequence: [dot, space, dot, space, dot, space, dot, space, dispatchEvent],
  },
    "5": {
    code: 53,
    shift: false,
    sequence: [dot, space, dot, space, dot, space, dot, space, dot],
  },
    "6": {
    code: 54,
    shift: false,
    sequence: [dash, space, dot, space, dot, space, dot, space, dot],
  },
    "7": {
    code: 55,
    shift: false,
    sequence: [dash, space, dash, space, dot, space, dot, space, dot],
  },
    "8": {
    code: 56,
    shift: false,
    sequence: [dash, space, dash, space, dash, space, dot, space, dot],
  },
    "9": {
    code: 57,
    shift: false,
    sequence: [dash, space, dash, space, dash, space, dash, space, dot],
  },
    ".": {
    code: 190,
    shift: false,
    sequence: [dot, space, dash, space, dot, space, dash, space, dot, space, dash],
  },
    ",": {
    code: 188,
    shift: false,
    sequence: [dash, space, dash, space, dot, space, dot, space, dash, space, dash],
  },
    "?": {
    code: 191,
    shift: true,
    sequence: [dot, space, dot, space, dash, space, dash, space, dot, space, dot],
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
    sequence: [dot, space, dash, space, dash, space, dash, space, dash, space, dot],
  },
    '"': {
    // is this the right way?
    code: 222,
    shift: true,
    sequence: [dot, space, dash, space, dot, space, dot, space, dash, space, dot],
  },
    "(": {
    code: 57,
    shift: true,
    sequence: [dash, space, dot, space, dash, space, dash, space, dot],
  },
    ")": {
    code: 48,
    shift: true,
    sequence: [dash, space, dot, space, dash, space, dash, space, dot, space, dash],
  },
    "&": {
    code: 55,
    shift: true,
    sequence: [dot, space, dash, space, dot, space, dot, space, dot],
  },
    ":": {
    code: 186,
    shift: false,
    sequence: [dash, space, dash, space, dash, space, dot, space, dot, space, dot],
  },
    ";": {
    code: 186,
    shift: false,
    sequence: [dash, space, dot, space, dash, space, dot, space, dash, space, dot],
  },
    "/": {
    code: 191,
    shift: false,
    sequence: [dash, space, dot, space, dot, space, dash, space, dot],
  },
    "_": {
    code: 189,
    shift: true,
    sequence: [dot, space, dot, space, dash, space, dash, space, dot, space, dash],
  },
    "=": {
    code: 187,
    shift: false,
    sequence: [dash, space, dot, space, dot, space, dot, space, dash],
  },
    "+": {
    code: 187,
    shift: true,
    sequence: [dot, space, dash, space, dot, space, dash, space, dot],
  },
    "-": {
    code: 189,
    sequence: [dash, space, dot, space, dot, space, dot, space, dot, space, dash],
  },
    "$": {
    code: 52,
    shift: true,
    sequence: [dot, space, dot, space, dot, space, dash, space, dot, space, dot, space, dash],
  },
    "@": {
    code: 50,
    shift: true,
    sequence: [dot, space, dash, space, dash, space, dot, space, dash, space, dot],
  }
}

// const isElement = (val) => {
//   const allowedElements = [dot, dash, space, stop];
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
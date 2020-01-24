// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import signalElements from './signalElements';
import calcScores from 'util';

const { dot, dash, space, linebreak } = signalElements;

const alphabet = {
    "a": {
    name: "a",
    code: 65,
    shift: false,
    sequence: [dot, dash],
  },
    "b": {
    name: "b",
    code: 66,
    shift: false,
    sequence: [dash, dot, dot, dot],
  },
    "c": {
    name: "c",
    code: 67,
    shift: false,
    sequence: [dash, dot, dash, dot],
  },
    "d": {
    name: "d",
    code: 68,
    shift: false,
    sequence: [dash, dot, dot],
  },
    "e": {
    name: "e",
    code: 69,
    shift: false,
    sequence: [dot],
  },
    "f": {
    name: "f",
    code: 70,
    sequence: [dot, dot, dash, dot],
  },
    "g": {
    name: "g",
    code: 71,
    shift: false,
    sequence: [dash, dash, dot],
  },
    "h": {
    name: "h",
    code: 72,
    shift: false,
    sequence: [dot, dot, dot, dot],
  },
    "i": {
    name: "i",
    code: 73,
    shift: false,
    sequence: [dot, dot],
  },
    "j": {
    name: "j",
    code: 74,
    sequence: [dot, dash, dash, dash],
  },
    "k": {
    name: "k",
    code: 75,
    shift: false,
    sequence: [dash, dot, dash],
  },
    "l": {
    name: "l",
    code: 76,
    shift: false,
    sequence: [dot, dash, dot, dot],
  },
    "m": {
    name: "m",
    code: 77,
    shift: false,
    sequence: [dash, dash],
  },
    "n": {
    name: "n",
    code: 78,
    shift: false,
    sequence: [dash, dot],
  },
    "o": {
    name: "o",
    code: 79,
    shift: false,
    sequence: [dash, dash, dash],
  },
    "p": {
    name: "p",
    code: 80,
    shift: false,
    sequence: [dot, dash, dash, dot],
  },
    "q": {
    name: "q",
    code: 81,
    shift: false,
    sequence: [dash, dash, dot, dash],
  },
    "r": {
    name: "r",
    code: 82,
    shift: false,
    sequence: [dot, dash, dot],
  },
    "s": {
    name: "s",
    code: 83,
    sequence: [dot, dot, dot],
  },
    "t": {
    name: "t",
    code: 84,
    shift: false,
    sequence: [dash],
  },
    "u": {
    name: "u",
    code: 85,
    shift: false,
    sequence: [dot, dot, dash],
  },
    "v": {
    name: "v",
    code: 86,
    shift: false,
    sequence: [dot, dot, dot, dash],
  },
    "w": {
    name: "w",
    code: 87,
    shift: false,
    sequence: [dot, dash, dash],
  },
    "x": {
    name: "x",
    code: 88,
    shift: false,
    sequence: [dash, dot, dot, dash],
  },
    "y": {
    name: "y",
    code: 89,
    shift: false,
    sequence: [dash, dot, dash, dash],
  },
    "z": {
    name: "z",
    code: 90,
    sequence: [dash, dash, dot, dot],
  },
    "0": {
    name: "0",
    code: 48,
    shift: false,
    sequence: [dash, dash, dash, dash, dash],
  },
    "1": {
    name: "1",
    code: 49,
    shift: false,
    sequence: [dot, dash, dash, dash, dash],
  },
    "2": {
    name: "2",
    code: 50,
    shift: false,
    sequence: [dot, dot, dash, dash, dash],
  },
    "3": {
    name: "3",
    code: 51,
    shift: false,
    sequence: [dot, dot, dot, dash, dash],
  },
    "4": {
    name: "4",
    code: 52,
    shift: false,
    sequence: [dot, dot, dot, dot, dispatchEvent],
  },
    "5": {
    name: "5",
    code: 53,
    shift: false,
    sequence: [dot, dot, dot, dot, dot],
  },
    "6": {
    name: "6",
    code: 54,
    shift: false,
    sequence: [dash, dot, dot, dot, dot],
  },
    "7": {
    name: "7",
    code: 55,
    shift: false,
    sequence: [dash, dash, dot, dot, dot],
  },
    "8": {
    name: "8",
    code: 56,
    shift: false,
    sequence: [dash, dash, dash, dot, dot],
  },
    "9": {
    name: "9",
    code: 57,
    shift: false,
    sequence: [dash, dash, dash, dash, dot],
  },
    ".": {
    name: ".",
    code: 190,
    shift: false,
    sequence: [dot, dash, dot, dash, dot, dash],
  },
    ",": {
    name: ",",
    code: 188,
    shift: false,
    sequence: [dash, dash, dot, dot, dash, dash],
  },
    "?": {
    name: "?",
    code: 191,
    shift: true,
    sequence: [dot, dot, dash, dash, dot, dot],
  },
    "!": {
    name: "!",
    code: 49,
    shift: true,
    sequence: [dash, dot, dash, dot, dash, dash],
  },
    "'": {
    name: "'",
    code: 222,
    shift: false,
    sequence: [dot, dash, dash, dash, dash, dot],
  },
    '"': {
    name: '"',
    code: 222,
    shift: true,
    sequence: [dot, dash, dot, dot, dash, dot],
  },
    "(": {
    name: "(",
    code: 57,
    shift: true,
    sequence: [dash, dot, dash, dash, dot],
  },
    ")": {
    name: ")",
    code: 48,
    shift: true,
    sequence: [dash, dot, dash, dash, dot, dash],
  },
    "&": {
    name: "&",
    code: 55,
    shift: true,
    sequence: [dot, dash, dot, dot, dot],
  },
    ":": {
    name: ":",
    code: 186,
    shift: false,
    sequence: [dash, dash, dash, dot, dot, dot],
  },
    ";": {
    name: ";",
    code: 186,
    shift: false,
    sequence: [dash, dot, dash, dot, dash, dot],
  },
    "/": {
    name: "/",
    code: 191,
    shift: false,
    sequence: [dash, dot, dot, dash, dot],
  },
    "_": {
    name: "_",
    code: 189,
    shift: true,
    sequence: [dot, dot, dash, dash, dot, dash],
  },
    "=": {
    name: "=",
    code: 187,
    shift: false,
    sequence: [dash, dot, dot, dot, dash],
  },
    "+": {
    name: "+",
    code: 187,
    shift: true,
    sequence: [dot, dash, dot, dash, dot],
  },
    "-": {
    name: "-",
    code: 189,
    sequence: [dash, dot, dot, dot, dot, dash],
  },
    "$": {
    name: "$",
    code: 52,
    shift: true,
    sequence: [dot, dot, dot, dash, dot, dot, dash],
  },
    "@": {
    name: "@",
    code: 50,
    shift: true,
    sequence: [dot, dash, dash, dot, dash, dot],
  },
    "&nbsp": {
    name: " ",
    code: 32,
    shift: false,
    sequence: [space],
  },
    "&br": {
    name: "   ",
    code: 13,
    shift: false,
    sequence: [linebreak],
  },
}

// const isElement = (val) => {
//   const allowedElements = [dot, dash, linebreak];
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
// export default {
//   alphabet: alphabet,
//   alphabetWithScores: calcScores(alphabet)
// };



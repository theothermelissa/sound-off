import React from 'react';
import PropTypes from 'prop-types';
import signalElements from './signalElements';

const [ dot, dash, space, stop ] = signalElements;

const phrases = [
  {
    phrase: "SOS",
    sequence: [dot, dot, dot, dash, dash, dash, dot, dot, dot]
  },{
    phrase: "New Line",
    sequence: [dot, dash, dot, dash]
  },{
    phrase: "New Page",
    sequence: [dot, dash, dot, dash, dot]
  },{
    phrase: "New Paragraph",
    sequence: [dash, dot, dot, dot, dash]
  },{
    phrase: "Attention",
    sequence: [dash, dot, dash, dot, dash]
  },{
    phrase: "Error",
    sequence: [dot, dot, dot, dot, dot, dot, dot, dot]
  },{
    phrase: "Wait",
    sequence: [dot, dash, dot, dot, dot]
  },{
    phrase: "Break",
    sequence: [dash, dot, dot, dot, space, dash, dot, dash]
  },{
    phrase: "Closing",
    sequence: [dash, dot, dash, dot, space, dot, dash, dot, dot]
  },{
    phrase: "End of Contact",
    sequence: [dot, dot, dot]
  },{
    phrase: "Understood",
    sequence: [dot, dot, dot, dash, dot]
  },{
    phrase: "Named station invited to transmit",
    sequence: [dash, dot, dash, dash, dot]
  },{
    phrase: "Any station invited to transmit",
    sequence: [dash, dot, dash]
  }
];

const isElement = (val) => {
  const allowedElements = [dot, dash, space, stop];
  return allowedElements.includes(val);
  // if (allowedElements.includes(val)) {
  //   return true;
  // } else {
  //   return false;
  // }
};

phrases.propTypes = {
  phrase: PropTypes.string,
  sequence: PropTypes.arrayOf(
    PropTypes.oneOfType(isElement)
  )
};
import React, { useState } from 'react';

const Scoreboard = (props) => {
  const { errorCount, elapsedTime } = props;

  return (
    <div>
      <div>{errorCount}</div>
      <div>{elapsedTime}</div>
    </div>
  )
}


export default Scoreboard;
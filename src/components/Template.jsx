import React, { useState } from 'react';

const Template = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="container">
    { isActive ? <div className="child" /> : null }
    </div>
  );
};

export default Template;

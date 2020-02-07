import React, { useState, useEffect } from 'react';

const ToggleButton = ({ isSelected, id, onSelect }) => {
  const [isChecked, setIsChecked] = useState('');
  useEffect(() => (
    isSelected ? setIsChecked('checked') : setIsChecked('')
  ), [isSelected]);

  return (
    <form action="#">
      <div className="toggle">
        <input type="checkbox" onChange={onSelect} className="toggle-input" id={id} checked={isChecked} />
        <label htmlFor={id} className="toggle-label" />
      </div>
    </form>
  );
};

export default ToggleButton;

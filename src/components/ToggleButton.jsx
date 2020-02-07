import React, { useState, useEffect } from 'react';

const ToggleButton = ({ isSelected, id, onSelect }) => {
  const [isChecked, setIsChecked] = useState('');
  useEffect(() => (
    isSelected ? setIsChecked('checked') : setIsChecked('')
  ), [isSelected]);

  return (
    <form action="#">
      <div className="toggle">
        <input type="checkbox" className="toggle-input" id={id} checked={isChecked} />
        <label onClick={onSelect} htmlFor={id} className="toggle-label" />
      </div>
    </form>
  );
};

export default ToggleButton;

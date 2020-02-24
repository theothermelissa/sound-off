import React from 'react';

const DownloadLink = ({ source, text }) => {
  const click = () => {
  }

  return (
    <a
      href={source}
      download
      onClick={click}
    >
      {text}
    </a>
  );
};

export default DownloadLink;

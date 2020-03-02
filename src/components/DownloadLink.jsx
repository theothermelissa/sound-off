import React from 'react';

const DownloadLink = ({ source, buttonText, fileName }) => {

  return (
    <a
      className="downloadButton"
      href={source}
      download={fileName}
    >
      {buttonText}
    </a>
  );
};

export default DownloadLink;

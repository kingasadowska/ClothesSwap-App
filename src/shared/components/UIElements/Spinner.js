import React from 'react';

import './Spinner.css';

const Spinner = props => {
  return (
    <div className={`${props.asOverlay && 'loading-spinner'}`}>
      <div className="ring"></div>
    </div>
  );
};

export default Spinner;

import React, { useState } from 'react';
import './progress-bar.scss';
let toggled = false;
const ProgressBar = props => {
  const { height, percent, activated } = props;
  toggled = activated || toggled;
  return (
    <div
      className="progress-bar"
      style={{ height: `${height ? height : 8}px`, maxWidth: '100%' }}
    >
      <div
        className="progress-bar-content"
        style={
          activated || toggled
            ? {
                width: `${percent}%`,
                backgroundColor: `hsl(${percent}, 65%, 55%)`
              }
            : {
                width: `3%`,
                backgroundColor: `hsl(0, 50%, 45%)`
              }
        }
      />
    </div>
  );
};

export default ProgressBar;

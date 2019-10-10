import React, { useState } from 'react';
import './skills-tile.scss';
import ProgressBar from './progress-bar';
import ReactTooltip from 'react-tooltip';

const SkillsTile = ({ info, activeSkill, setActiveSkill, activated }) => {
  const { img, skillLevel, name } = info;
  let tileRef = null;
  return (
    <div>
      <div
        className={`skills-tile ${activeSkill.name === name ? 'active' : ''}`}
        onClick={() => {
          if (activeSkill.name !== name) {
            ReactTooltip.show(tileRef);
            setActiveSkill(info);
          } else {
            ReactTooltip.hide(tileRef);
            setActiveSkill({});
          }
        }}
      >
        <img className="skills-tile-image" src={img} />
        <ProgressBar percent={skillLevel} activated={activated} />
        <div>{name}</div>
      </div>
      <p ref={ref => (tileRef = ref)} data-tip />
    </div>
  );
};

export default SkillsTile;

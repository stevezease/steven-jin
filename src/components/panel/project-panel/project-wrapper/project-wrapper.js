import React from 'react';
import Fade from 'react-reveal/Fade';
import './project-wrapper.css';
import MurderBridgePanel from '../murderbridge/murderbridge';
import ReactBokehPanel from '../react-bokeh/react-bokeh';
import SameSeiyuPanel from '../same-seiyu/same-seiyu';
import GravityPanel from '../gravity/gravity';

const ProjectWrapper = () => {
  return (
    <div className="project-panel-wrapper">
      <div className="slide">
        <Fade duration={1500} delay={1000}>
          <h1 className="project-panel-header">Projects</h1>
        </Fade>
      </div>
      <div className="slide">
        <MurderBridgePanel />
      </div>
      <div className="slide">
        <ReactBokehPanel />
      </div>
      <div className="slide">
        <SameSeiyuPanel />
      </div>
      <div className="slide">
        <GravityPanel />
      </div>
    </div>
  );
};

export default ProjectWrapper;

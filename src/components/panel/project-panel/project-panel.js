import React, { useState, useEffect } from 'react';
import Panelify from '../../panel';
import './project-panel.scss';
import Fade from 'react-reveal/Fade';
import murderbridgepic from '../../../res/murderbridge.png';
import { Parallax } from 'react-scroll-parallax';
import '../../../../src/style/react-tabs.css';
import MurderBridgePanel from './murderbridge/murderbridge';
import ReactBokehPanel from './react-bokeh/react-bokeh';
import SameSeiyuPanel from './same-seiyu/same-seiyu';
import GravityPanel from './gravity/gravity';

const ProjectPanel = React.memo(({ percentScroll, setNavBarText }) => {
  if (percentScroll === 1) {
    setNavBarText('Projects');
  }
  return (
    <React.Fragment>
      <div className="project-panel">
        <Fade duration={1500} delay={500}>
          <h1 className="project-panel-header">Projects</h1>
        </Fade>
        <MurderBridgePanel />
        <ReactBokehPanel />
        <SameSeiyuPanel />
        <GravityPanel />
      </div>
    </React.Fragment>
  );
});
ProjectPanel.displayName = 'Project Panel';
const panelTransform = percent => {
  return {};
};
export default Panelify(ProjectPanel, panelTransform);

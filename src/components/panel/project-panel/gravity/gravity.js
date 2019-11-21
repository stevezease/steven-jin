import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Fade from 'react-reveal/Fade';
import Gravity2 from '../../../../res/gravity2.webm';
import '../../../../../node_modules/react-bokeh/src/bokeh.css';
import './gravity.css';

const GravityPanel = React.memo(() => {
  return (
    <div>
      <Fade>
        <div className="gravity-shell">
          {' '}
          <video className="gravity-video" loop autoPlay muted src={Gravity2} />
          <div className="gravity-content">
            <div className="project-panel-container">
              <div className="project-description">
                <div className="project-title">
                  <a
                    href="https://www.npmjs.com/package/react-bokeh"
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                    rel="noopener noreferrer"
                  >
                    <div className="project-title-link">
                      <Fade delay={1000}>
                        <span className="react-bokeh-title">Gravity2</span>
                      </Fade>
                    </div>
                  </a>
                  <span className="project-subtitle">
                    <Fade delay={1000}>Physics Based Music Visualizer</Fade>
                  </span>
                </div>
                <Fade delay={1000}>
                  <div className="react-light-tabs">
                    <Tabs>
                      <TabList>
                        <Tab>Overview</Tab>
                        <Tab>Features</Tab>
                        <Tab>Tech Stack</Tab>
                      </TabList>

                      <TabPanel>
                        <div> User Interactible Music Visualizer in C</div>
                      </TabPanel>
                      <TabPanel>
                        <div>
                          <div>Self implemented physics engine</div>
                          <div>Multitude of colors and settings</div>
                          <div>WAV File compatible on Mac OS</div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div>
                          <div>C</div>
                          <div>Open Gl/Glut</div>
                          <div>KissFFT</div>
                        </div>
                      </TabPanel>
                    </Tabs>
                  </div>
                </Fade>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
});
GravityPanel.displayName = 'Gravity';
export default GravityPanel;

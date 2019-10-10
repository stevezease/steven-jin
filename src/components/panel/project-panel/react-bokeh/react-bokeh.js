import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import Bokeh from 'react-bokeh';
import '../../../../../node_modules/react-bokeh/src/bokeh.css';
import './react-bokeh.css';

const ReactBokehPanel = React.memo(() => {
  return (
    <div>
      <Fade>
        <div className="react-bokeh-shell">
          {' '}
          <Bokeh
            randomGenerate={false}
            lights={[
              {
                color: '#b6080b',
                size: '100px',
                top: '20%',
                left: '30%'
              },
              {
                color: '#b6080b',
                size: '400px',
                top: '60%',
                left: '70%'
              },
              {
                color: '#1a1b37',
                size: '175px',
                top: '25%',
                left: '45%'
              },
              {
                color: '#1a1b37',
                size: '250px',
                top: '40%',
                left: '60%'
              },
              {
                color: '#1a1b37',
                size: '350px',
                top: '50%',
                left: '15%'
              },
              {
                color: '#6a4260',
                size: '200px',
                top: '15%',
                left: '5%'
              },
              {
                color: '#ff9900',
                size: '200px',
                top: '50%',
                left: '30%'
              },
              {
                color: '#ff9900',
                size: '300px',
                top: '70%',
                left: '40%'
              },
              {
                color: '#ff9900',
                size: '225px',
                top: '20%',
                left: '80%'
              },
              {
                color: '#6a4260',
                size: '230px',
                top: '5%',
                left: '60%'
              },
              {
                color: '#6a4260',
                size: '150px',
                top: '35%',
                left: '45%'
              }
            ]}
          />
          <div className="react-bokeh-content">
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
                        <span className="react-bokeh-title">
                          React Bokeh
                          <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
                        </span>
                      </Fade>
                    </div>
                  </a>
                  <span className="project-subtitle">
                    <Fade delay={1000}>Bokeh Simulaton For React</Fade>
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
                        <div>
                          A React library for simulating the bokeh camera effect
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div>
                          <div>
                            <a href="https://kind-wilson-41f501.netlify.com/">
                              Dynamic Helper tool and Demo Site on Netlify
                            </a>
                          </div>
                          <div>
                            Fully Size, Color, and Placement Customizable
                          </div>
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div>
                          <div>ReactJS</div>
                          <div>NPM</div>
                          <div>Netlify</div>
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
ReactBokehPanel.displayName = 'React Bokeh';
export default ReactBokehPanel;

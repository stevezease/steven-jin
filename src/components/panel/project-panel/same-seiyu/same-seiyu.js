import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';

const SameSeiyuPanel = () => {
  return (
    <div>
      {' '}
      <div className="project-panel-container">
        <div className="project-description">
          <div className="murderbridge-title project-title">
            <a
              href="https://www.SameSeiyu.com"
              target="_blank"
              style={{ textDecoration: 'none' }}
              rel="noopener noreferrer"
            >
              <div className="project-title-link">
                SameSeiyu.com
                <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
              </div>
            </a>
            <span className="project-subtitle">
              Anime Voice Actor <br /> Character Aggregator
            </span>
          </div>
          <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Features</Tab>
              <Tab>Details</Tab>
              <Tab>Tech Stack</Tab>
            </TabList>

            <TabPanel>
              <h2>Overview</h2>
            </TabPanel>
            <TabPanel>
              <h2>Features</h2>
            </TabPanel>
            <TabPanel>
              <h2>Details</h2>
            </TabPanel>
            <TabPanel>
              <h2>Tech Stack</h2>
            </TabPanel>
          </Tabs>
        </div>
        <Fade bottom distance="50px" duration={1500} delay={1000}>
          <video
            className="murderbridge-pic project-video"
            loop
            autoPlay
            muted
            src="https://giant.gfycat.com/UnrealisticUnitedBluefintuna.webm"
          />
        </Fade>
      </div>
    </div>
  );
};

export default SameSeiyuPanel;

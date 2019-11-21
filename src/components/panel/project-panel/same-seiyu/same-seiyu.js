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
              href="https://clever-morse-58ec40.netlify.com/"
              target="_blank"
              style={{ textDecoration: 'none' }}
              rel="noopener noreferrer"
            >
              <div className="project-title-link">
                SameSeiyu
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
              <Tab>Tech Stack</Tab>
            </TabList>

            <TabPanel>
              <div>
                A visualization of mutual voice actor characters in React with
                Python Scraper
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <div>
                  Python Scraper gathers and ranks voice actor information
                </div>
                <div>Custom built dynamic caurosel</div>
                <div>Hosted with CICD on Netlify</div>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <div>React</div>
                <div>Python</div>
                <div>Netlify</div>
              </div>
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

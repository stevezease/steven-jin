import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Fade from 'react-reveal/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons';
import ScrollAnimation from 'react-animate-on-scroll';

const MurderBridgePanel = () => {
  return (
    <div>
      {' '}
      <div className="project-panel-container">
        <div className="project-description">
          <div className="murderbridge-title project-title">
            <a
              href="https://www.murderbridge.com"
              target="_blank"
              style={{ textDecoration: 'none' }}
              rel="noopener noreferrer"
            >
              <div className="project-title-link">
                MurderBridge.com
                <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
              </div>
            </a>
            <span className="project-subtitle">
              League of Legends <br /> Data Visualization Web App
            </span>
          </div>
          <Tabs>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Highlights</Tab>
              <Tab>Features</Tab>
              <Tab>Tech Stack</Tab>
            </TabList>

            <TabPanel>
              <div>
                Dynamically Generated Reference Tool for the League of Legends
                ARAM Game Mode
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <div>
                  <a href="https://comicbook.com/gaming/2019/04/20/league-of-legends-aram-site-murder-bridge/">
                    Featured on CBS's ComicBook.com
                  </a>
                </div>
                <div> Visted by over 1000 daily visitors </div>
                <div> #1 Google Search Result for ARAM Builds</div>
                <div>
                  {' '}
                  Hit the front page of the League of Legends Subreddit{' '}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div>
                <div>Responsive and Mobile Compatible</div>
                <div>Cloud Integrated with AWS and Google Cloud Platform</div>
                <div>Custom scraping and aggregation algorithm</div>
                <div>Search Engine Optimized</div>
                <div>Multi Regional Support</div>
              </div>
            </TabPanel>
            <TabPanel>
              <div>React / Redux</div>
              <div>Python</div>
              <div>AWS S3, Cloudfront, Lambda</div>
            </TabPanel>
          </Tabs>
        </div>
        <Fade bottom distance="50px" duration={1500} delay={500}>
          <video
            className="murderbridge-pic project-video"
            loop
            autoPlay
            muted
            src="https://giant.gfycat.com/UntidyLankyAmericancrow.webm"
          />
        </Fade>
      </div>
    </div>
  );
};

export default MurderBridgePanel;

import React from 'react';
import './experience-panel.scss';
import ExperieceEntry from './experience-entry.js';
import Bounce from 'react-reveal/Bounce';
import Panelify from '../../panel';
const experiences = [
  {
    company: 'JP Morgan Chase',
    project: 'Loan Management Platform',
    date: 'July 2017 - Present',
    responsibilities: ['Line 1', 'Line 2', 'Line 3', 'Line 4'],
    src: 'https://imgur.com/UeeWNkW.png'
  },
  {
    company: 'JP Morgan Chase',
    project: 'Machine Learning for Loan Analysis Prototype',
    date: 'July 2017 - Present',
    responsibilities: ['Line 1', 'Line 2', 'Line 3', 'Line 4'],
    src: 'https://imgur.com/UeeWNkW.png'
  },
  {
    company: 'JP Morgan Chase',
    project: 'MediaWiki Data Documentation',
    date: 'July 2017 - Present',
    responsibilities: ['Line 1', 'Line 2', 'Line 3', 'Line 4'],
    src: 'https://i.imgur.com/UeeWNkW.png'
  },
  {
    company: 'AOL',
    project: 'Mobile Advertising',
    date: 'July 2017 - Present',
    responsibilities: [],
    src: 'https://i.imgur.com/xUts1zd.png'
  }
];
const ExperiencePanel = React.memo(({ percentScroll, setNavBarText }) => {
  if (percentScroll === 1) {
    setNavBarText('Experience');
  }
  return (
    <div className="experience-panel-container">
      <div className="experience-panel">
        <div className="experience-header">
          <div>Work Experience</div>
          <hr
            className="experience-header-divider"
            style={{ width: `${percentScroll * percentScroll * 100}%` }}
          />
        </div>
        {experiences.map((experience, i) => (
          <Bounce left key={i}>
            <ExperieceEntry data={experience} index={i} />
          </Bounce>
        ))}
      </div>
    </div>
  );
});
ExperiencePanel.displayName = 'Experience Panel';
const panelTransform = percent => {};

export default Panelify(ExperiencePanel, panelTransform);

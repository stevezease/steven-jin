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
    responsibilities: [
      'Piloted a UI overhaul of the application by creating flexible form layouts and redesigning the user experience',
      'Constructed loan assessment forms and widgets and integrated them into Java based microservices.',
      'Introduced responsive and mobile compatible design with CSS flexbox and media queries',
      'Headed the full stack integration of firmware data store by parsing and visualizing data',
      'Built an organizational wide tool for dynamic JSON construction and template formatting',
      'Designed, implemented and deployed a team navigational page for easy access to bookmarks and links',
      'Ensured proper application function by writing Protractor/Cucumber scripts and Java Unit tests'
    ],
    src: 'https://imgur.com/UeeWNkW.png'
  },
  {
    company: 'JP Morgan Chase',
    project: 'Machine Learning for Loan Analysis Prototype',
    date: 'March 2018 - May 2018',
    responsibilities: [
      'Headed front end development of the prototype by implementing UI mockups',
      'Constructed information cards with dynamic color indicators and pagination to display loan information',
      'Designed and developed landing page with sorting and filtering options on the information cards',
      'Plotted machine learning data from the back end on user slider inputs.'
    ],
    src: 'https://imgur.com/UeeWNkW.png'
  },
  {
    company: 'JP Morgan Chase',
    project: 'MediaWiki Data Documentation',
    date: 'June 2016 - August 2016',
    responsibilities: [
      'Learned and applied MediaWiki and Semantic MediaWiki to build a visualization for corporate data',
      'Constructed dynamic forms and inputs using Javascript and MediaWiki',
      'Worked to ensure the seamless transformation and loading of company information CSV’s into Wiki pages',
      'Conducted tests in development environments, cataloged defects and implemented Javascript fixes'
    ],
    src: 'https://i.imgur.com/UeeWNkW.png'
  },
  {
    company: 'AOL',
    project: 'Mobile Advertising',
    date: 'June 2015 - August 2015',
    responsibilities: [
      'Shadowed mobile advertising team to learn the basics of SDLC and geofence deployment',
      'Evaluated various methods of identifying mobile web browser users as mobile app users',
      'Analyzed the statistical accuracy of 20 gigabytes worth of geolocation data'
    ],
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

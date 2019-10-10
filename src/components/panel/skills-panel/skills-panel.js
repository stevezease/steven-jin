import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Panelify from '../../panel';
import SkillsTile from './skills-tile';
import './skills-panel.scss';
import Fade from 'react-reveal/Fade';
import ReactTooltip from 'react-tooltip';

const skills = [
  {
    name: 'React',
    skillLevel: 80,
    description: 'Javascript Library for building UI Components',
    img: 'https://i.imgur.com/DzMDtMk.png',
    tags: ['Libraries and Frameworks']
  },
  {
    name: 'Redux',
    skillLevel: 35,
    description: 'React library for global state management',
    img: 'https://i.imgur.com/3YL7xVO.png',
    tags: ['Libraries and Frameworks']
  },
  {
    name: 'Angular',
    skillLevel: 65,
    description: 'Javascript framework for building UI Components',
    img: 'https://i.imgur.com/8oyWWz9.png',
    tags: ['Libraries and Frameworks']
  },
  {
    name: 'RxJs',
    skillLevel: 40,
    description:
      'Javascript library for handling asynchronous code via Observables',
    img: 'https://i.imgur.com/XHRqKoq.png',
    tags: ['Libraries and Frameworks']
  },
  {
    name: 'Bootstrap',
    skillLevel: 60,
    description: 'CSS library for responsive, mobile first web development',
    img: 'https://i.imgur.com/XlxkSak.png',
    tags: ['Libraries and Frameworks']
  },
  {
    name: 'Sass',
    skillLevel: 45,
    description: 'CSS Preprocessing language',
    img: 'https://i.imgur.com/cm8H22i.png',
    tags: ['Libraries and Frameworks']
  },
  {
    name: 'HTML',
    skillLevel: 85,
    description: 'Primary markup langauage for website development',
    img: 'https://i.imgur.com/EKyVnOU.png',
    tags: ['Languages']
  },
  {
    name: 'CSS',
    skillLevel: 85,
    description: 'Primary styling langauage for website development',
    img: 'https://i.imgur.com/35pSGha.png',
    tags: ['Languages']
  },
  {
    name: 'Javascript',
    skillLevel: 80,
    description: 'Primary scripting langauage for website development',
    img: 'https://i.imgur.com/VyENBc2.png',
    tags: ['Languages']
  },
  {
    name: 'Typescript',
    skillLevel: 45,
    description: 'Superset of Javascript that introduces static typing',
    img: 'https://i.imgur.com/eXObg9i.png',
    tags: ['Languages']
  },
  {
    name: 'Java',
    skillLevel: 50,
    description: 'General purpose, object oriented programming language',
    img: 'https://i.imgur.com/THYm6la.png',
    tags: ['Languages']
  },
  {
    name: 'Python',
    skillLevel: 40,
    description: 'General purpose, dynamically typed programming language',
    img: 'https://i.imgur.com/acpRzRC.png',
    tags: ['Languages']
  },
  {
    name: 'AWS',
    skillLevel: 35,
    description:
      'An infrastructure as a service, providing cloud based computing and solutions',
    img: 'https://i.imgur.com/X8IYQWx.png',
    tags: ['Technologies']
  }
];

const SkillsPanel = React.memo(({ percentScroll, setNavBarText }) => {
  if (percentScroll === 1) {
    setNavBarText('Skills');
  }
  const [skillsState, setSkillsState] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState({});
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setActiveSkill({});
    });
  }, []);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const openSkill = skill => {
    setActiveSkill(skill);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const generateProficiency = level => {
    return (
      <span
        style={{
          color: `${
            level > 66 ? '#99d743' : level > 33 ? '#d7be42' : '#d78c43'
          }`
        }}
      >
        {level > 66
          ? 'Proficient'
          : level > 33
          ? 'Capable'
          : 'Working Knowledge'}
      </span>
    );
  };

  const generateSkills = query =>
    skills
      .filter(skill => skill.tags.includes(query))
      .map((skill, index) => {
        const skillId = skill.name + index;
        return (
          <Fade delay={500 + index * 100} key={index} onReveal={() => {}}>
            <SkillsTile
              key={index}
              info={skill}
              activated={true}
              setActiveSkill={setActiveSkill}
              activeSkill={activeSkill}
            />
          </Fade>
        );
      });
  const generateSection = (label, id) => {
    return (
      <div>
        <h3 className="skill-panel-subheader">{label}</h3>
        <div className="skills-tile-container">{generateSkills(id)}</div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="skills-panel">
        <div
          style={{
            height: `${percentScroll === 1 ? 3 : 2}px`,
            width: '250px',
            backgroundColor: '#3b3b3b',
            position: 'absolute',
            top: '80px',
            left: '50%',
            marginLeft: `${percentScroll * -125}px`,
            opacity: percentScroll * percentScroll
          }}
        />
        <div
          style={{
            height: `${percentScroll === 1 ? 3 : 2}px`,
            width: '250px',
            backgroundColor: '#3b3b3b',
            position: 'absolute',
            top: '190px',
            right: '50%',
            marginRight: `${percentScroll * -125}px`,
            opacity: percentScroll * percentScroll
          }}
        />

        <h1
          className="skill-panel-header"
          style={{
            opacity: percentScroll * percentScroll,
            color: `${
              percentScroll === 1
                ? 'rgba(0, 0, 0, 0.75)'
                : 'rgba(0, 0, 0, 0.65)'
            }`
          }}
        >
          SKILLS
        </h1>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={closeModal}>close</button>
          <h1>{activeSkill && activeSkill.name}</h1>
        </Modal>
        <div className="skills-panel-container">
          {generateSection(
            'Front End Frameworks & Libraries',
            'Libraries and Frameworks'
          )}
          {generateSection('Languages', 'Languages')}
          {generateSection('Technologies', 'Technologies')}
          <ReactTooltip place="bottom">
            <div style={{ textAlign: 'left', width: '150px' }}>
              <div
                style={{
                  textAlign: 'center',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}
              >
                {activeSkill.name}
              </div>
              <div> {activeSkill.description} </div>
              <div style={{ marginTop: '10px' }}>
                Proficiency: {generateProficiency(activeSkill.skillLevel)}
              </div>
            </div>
          </ReactTooltip>
        </div>
      </div>
    </React.Fragment>
  );
});
const panelTransform = percent => {
  return { background: `rgba(235, 235, 235, ${percent ** 2})` };
};
export default Panelify(SkillsPanel, panelTransform);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

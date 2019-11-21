import React, { useState, useEffect } from 'react';
import './main-panel.scss';
import Typist from 'react-typist';
import Panelify from '../../panel';
import ScrollAnimation from 'react-animate-on-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileAlt,
  faEnvelope,
  faDownload,
  faEnvelopeOpenText
} from '@fortawesome/free-solid-svg-icons';
import ContactForm from './contact-form/contact-form';

const MainPanel = React.memo(
  ({ percentScroll, setNavBarText, setModalIsOpen }) => {
    if (percentScroll === 1) {
      setNavBarText('Steven Jin');
    }
    const attributeList = [
      'Life Long Student',
      'Physics Enthusiast',
      'Creator of MurderBridge.com',
      'Relentless Dreamer',
      'Javascript Lover',
      'React Guru',
      'Occasional Audiophile'
    ];

    const [attributeCount, setAttributeCount] = useState(0);
    const [typing, setTyping] = useState(true);
    const [resumeHover, setResumeHover] = useState(false);
    const [contactHover, setContactHover] = useState(false);

    const done = () => {
      setTyping(false);
    };

    useEffect(() => {
      // do some magic here every time the component re-renders
      if (!typing) {
        setAttributeCount((attributeCount + 1) % attributeList.length);
        setTyping(true);
      }
    }, [typing, attributeCount, attributeList.length]);

    return (
      <React.Fragment>
        <div className="main-panel">
          <div>
            <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
              <img
                className="profile-circle"
                src="https://i.imgur.com/S8vHtaE.jpg"
                alt="profile"
              />
            </ScrollAnimation>
            <div className="name-title">Steven Jin</div>
            <div className="sub-title">
              Software Engineer @ JP Morgan Chase
              <div
                className="typist"
                style={{
                  color: `hsl(${attributeCount * 55}, 50%, 45%)`,
                  height: '1em',
                  minWidth: '200px'
                }}
              >
                {typing && (
                  <Typist onTypingDone={done}>
                    {' '}
                    & {attributeList[attributeCount]}
                    <Typist.Backspace
                      count={attributeList[attributeCount].length}
                      delay={3000}
                    />
                  </Typist>
                )}
              </div>
            </div>
            <div className="main-panel-button-row">
              <div
                className="main-panel-button resume"
                onMouseEnter={() => setResumeHover(true)}
                onMouseLeave={() => setResumeHover(false)}
              >
                <React.Fragment>
                  <div style={{ width: '35px' }}>
                    <div className="resume-button-icon">
                      <FontAwesomeIcon icon={faDownload} />
                      <FontAwesomeIcon icon={faFileAlt} />
                    </div>
                  </div>
                  <div className="main-panel-button-label"> Resume </div>
                </React.Fragment>
              </div>
              <div
                className="main-panel-button contact"
                onMouseEnter={() => setContactHover(true)}
                onMouseLeave={() => setContactHover(false)}
                onClick={() => setModalIsOpen(true)}
              >
                {
                  <React.Fragment>
                    <div style={{ width: '35px' }}>
                      <FontAwesomeIcon
                        icon={contactHover ? faEnvelopeOpenText : faEnvelope}
                      />
                    </div>
                    <div className="main-panel-button-label"> Contact </div>
                  </React.Fragment>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-animation">
          <div className="scroll-container">
            <div className="chevron" />
            <div className="chevron" />
            <div className="chevron" />
            <span className="text">Scroll down</span>
          </div>
        </div>
      </React.Fragment>
    );
  }
);
MainPanel.displayName = 'Main Panel';
const panelTransform = percent => {
  return { opacity: percent ** 2 };
};

export default Panelify(MainPanel, panelTransform);

import React, { useState } from 'react';
import './contact-button.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLink,
  faEnvelopeOpen,
  faEnvelopeOpenText
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const ContactButton = ({ setModalIsOpen }) => {
  return (
    <div className="contact-button">
      <div className="contact-button-container">
        <div className="contact-button-content">
          <div
            className="contact-button-node"
            onClick={() => setModalIsOpen(true)}
          >
            <span className="fa-envelope">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <span className="fa-envelope-open">
              <FontAwesomeIcon icon={faEnvelopeOpenText} />
            </span>
          </div>
          <div className="contact-button-node">
            {' '}
            <a
              href="https://www.linkedin.com/in/steven-jin-58781a89/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />{' '}
            </a>
          </div>
          <div className="contact-button-node">
            <a
              href="https://github.com/stevezease/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />{' '}
            </a>
          </div>
        </div>
        <div className="contact-button-overlay">Let's Get in Touch!</div>
      </div>
    </div>
  );
};

export default ContactButton;

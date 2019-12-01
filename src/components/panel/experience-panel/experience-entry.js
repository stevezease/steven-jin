import React, { useState } from 'react';
import './experience-entry.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';

const ExperienceEntry = ({ data, index }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className="experience-entry"
      onClick={() => {
        setExpanded(!expanded);
      }}
      //   style={{
      //     background: `hsl(${(index + 2) * 80}, 50%, 85%)`
      //   }}
    >
      <div className="experience-entry-company">
        <div
          style={{
            display: 'inline-block',
            borderBottom: `3px solid hsl(${(index + 2) * 80}, 50%, 85%)`
          }}
        >
          <img src={data.src} className="company-logo" />
        </div>
      </div>
      <div className="experience-entry-header">
        <div className="experience-entry-header-project">{data.project}</div>
        <div className="experience-entry-header-date">{data.date}</div>
      </div>
      {expanded && (
        <ul className="experience-entry-body">
          {data.responsibilities.map(responsibility => (
            <li className="experience-entry-content">{responsibility}</li>
          ))}
        </ul>
      )}
      <div className="experience-entry-footer">
        <div
          className={`experience-entry-expand-icon ${
            expanded ? 'expanded' : ''
          }`}
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </div>
      </div>
    </div>
  );
};

export default ExperienceEntry;

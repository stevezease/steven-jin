import React, { useState, useEffect } from 'react';
import './nav-bar.scss';

const scrollToRef = ref => {
  console.log(ref);
  window.scrollTo(0, ref.current.ref.current.offsetTop);
};

const NavBar = ({ text, storyBoard }) => {
  return (
    <div className="nav-bar">
      <div className="left">
        <div className="nav-bar-logo">
          <div className="item">{text}</div>
        </div>
      </div>
      <div className="right">
        <div
          onClick={() => {
            scrollToRef(storyBoard[1].ref);
          }}
          className="item"
        >
          <a className={`${text === 'Skills' ? 'selected' : ''}`}>Skills</a>
        </div>
        <div
          onClick={() => {
            scrollToRef(storyBoard[2].ref);
          }}
          className="item"
        >
          <a className={`${text === 'Projects' ? 'selected' : ''}`}>Projects</a>
        </div>
        <div
          onClick={() => {
            scrollToRef(storyBoard[3].ref);
          }}
          className="item"
        >
          <a className={`${text === 'Experience' ? 'selected' : ''}`}>
            Experience
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

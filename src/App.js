import React from 'react';
import NavBar from './components/nav-bar/nav-bar';
import MainPanel from './components/panel/main-panel/main-panel';
import ReactGA from 'react-ga';
import './App.scss';
import SkillsPanel from './components/panel/skills-panel/skills-panel';
import { throttle } from 'lodash';
import TestPanel from './components/panel/test-panel/test-panel';
import { ParallaxProvider } from 'react-scroll-parallax';
import ProjectPanel from './components/panel/project-panel/project-panel';
import ExperiencePanel from './components/panel/experience-panel/experience-panel';
import Modal from 'react-modal';
import 'animate.css/animate.min.css';
import ContactForm from './components/panel/main-panel/contact-form/contact-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeOpen, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import ContactButton from './contact-button';

class App extends React.Component {
  storyBoard = [
    {
      name: 'main',
      panel: MainPanel,
      height: '100vh',
      ref: React.createRef()
    },
    {
      name: 'skills',
      panel: SkillsPanel,
      height: '1250px',
      ref: React.createRef()
    },
    {
      name: 'project',
      panel: ProjectPanel,
      height: '400vh',
      ref: React.createRef()
    },
    {
      name: 'experience',
      panel: ExperiencePanel,
      height: '800px',
      ref: React.createRef()
    }
  ];
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.initializeReactGA();
    this.state = {
      currentIndex: 0,
      currentOffSet: 0,
      navBarText: 'Steven Jin',
      modalIsOpen: false,
      contactHover: false
    };
  }
  setModalIsOpen = val => {
    this.setState({ modalIsOpen: val });
  };

  initializeReactGA = () => {
    ReactGA.initialize('UA-138252539-3');
    ReactGA.pageview('/home');
  };

  setContactHover = val => {
    this.setState({ contactHover: val });
  };
  setNavBarText = text => {
    if (text !== this.state.navBarText) {
      this.setState({
        navBarText: text
      });
    }
  };

  componentDidMount() {
    Modal.setAppElement('#app');
  }
  generatePercentShowing(offsetTop, offsetBottom, windowHeight) {
    if (offsetTop > windowHeight || offsetBottom < -1 * windowHeight) {
      return 0;
    }

    const getPercent = val => {
      let ans = Math.abs(val) / windowHeight;
      ans = ans > 1 ? 1 : ans < 0 ? 0 : ans;
      return 1 - ans;
    };
    return offsetTop >= 0
      ? getPercent(offsetTop)
      : 1 - getPercent(offsetBottom);
  }

  storyBoardGenerator() {
    let acc = 0;
    const windowHeight = window.innerHeight;
    const stories = this.storyBoard.map((story, index) => {
      // console.log(story.name, story.ref.current);
      let percent = story.name === 'main' ? 1 : 0;
      let percentShowing = story.name === 'main' ? 1 : 0;
      const ref = story.ref.current;
      if (ref && ref.ref) {
        const boundingRect = ref.ref.current.getBoundingClientRect();
        const refHeight = boundingRect.height;
        const offsetTop = boundingRect.top;
        const offSetBottom = boundingRect.bottom;
        percent = this.generatePercentShowing(
          offsetTop,
          offSetBottom,
          windowHeight
        );
        //percentShowing = this.generatePercentShowing();

        acc += refHeight;
      }
      return (
        <story.panel
          ref={story.ref}
          percentScroll={percent}
          height={story.height}
          key={story.name}
          setNavBarText={this.setNavBarText}
          setModalIsOpen={this.setModalIsOpen}
        />
      );
    });
    return stories;
  }

  handleScroll = () => {
    this.setState({
      scrollY: Math.abs(this.ref.current.getBoundingClientRect().y)
    });
  };
  throttledScrollHandler = throttle(this.handleScroll, 50);

  componentDidMount() {
    window.addEventListener('scroll', this.throttledScrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.throttledScrollHandler);
  }

  render() {
    const { modalIsOpen, contactHover } = this.state;
    return (
      <ParallaxProvider>
        <div className="App" id="app" ref={this.ref}>
          <NavBar text={this.state.navBarText} storyBoard={this.storyBoard} />
          {this.storyBoardGenerator()}
          <ContactButton setModalIsOpen={this.setModalIsOpen} />
          {/* <div
            className="contact-button"
            onMouseEnter={() => this.setContactHover(true)}
            onMouseLeave={() => this.setContactHover(false)}
            onClick={() => this.setModalIsOpen(true)}
          >
            {
              <React.Fragment>
                <FontAwesomeIcon
                  icon={contactHover ? faEnvelopeOpen : faEnvelope}
                />
              </React.Fragment>
            }
          </div> */}
          <ContactForm
            modalIsOpen={modalIsOpen}
            setModalIsOpen={this.setModalIsOpen}
          />
        </div>
      </ParallaxProvider>
    );
  }
}

export default App;

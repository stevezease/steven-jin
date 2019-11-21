import React from 'react';

// This function takes a component...
function Panelify(WrappedComponent, panelStyleTransform) {
  // ...and returns another component...
  return class Panelled extends React.PureComponent {
    constructor(props) {
      super(props);
      this.ref = React.createRef();
    }

    handleScroll(e) {}
    render() {
      const {
        percentScroll,
        height,
        setNavBarText,
        setModalIsOpen
      } = this.props;
      return (
        <div
          className="panel"
          style={{
            ...panelStyleTransform(percentScroll),
            minHeight: `${height}`
          }}
          ref={this.ref}
        >
          <WrappedComponent
            percentScroll={percentScroll}
            setNavBarText={setNavBarText}
            setModalIsOpen={setModalIsOpen}
          />
        </div>
      );
    }
  };
}

export default Panelify;

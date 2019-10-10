import React, { Component } from 'react';
import Panelify from '../../panel';

class TestPanel extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return <div />;
  }
}

export default Panelify(TestPanel, () => {});

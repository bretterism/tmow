import React, { Component } from 'react';

import api from './api'
import TmowConatiner from './tmow'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: []
    }

    api.subscribe((data) => {
      this.setState({ teams: data });
    });
  }

  render() {
    return (
      <div style={{padding: '25px'}}>
        <TmowConatiner />
      </div>
    );
  }
}

export default App;

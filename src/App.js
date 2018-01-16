import React, { Component } from 'react';
import { PageHeader, Row, Col } from 'react-bootstrap';

import api from './api'
import Tmow from './tmow'

const defaultImgUrl = 'img/default-avatar.png';

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
    const teamMembers = this.state.teams.map((team) => {
      return <Col md={6}><Tmow teamName={team.teamName} fullName={team.fullName} imgUrl={ team.imgUrl || defaultImgUrl } teamColor={team.teamColor}/></Col>;
    });

    return (
      <div>
        <PageHeader style={{textAlign: 'center'}}>Team Members of the Week!</PageHeader>
        <Row>{ teamMembers }</Row>
      </div>
    );
  }
}

export default App;

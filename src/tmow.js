import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Panel, Col, Row, Image } from 'react-bootstrap';

import api from './api';

const Tmow = (props) => {
	return (
		<Panel style={{margin: '10px'}}>
			<Panel.Heading style={{backgroundColor: props.teamColor}}>
				<h1 style={{textAlign: 'center', fontSize: '300%'}}><strong>{props.teamName}</strong></h1>
			</Panel.Heading>
			<Panel.Body style={{backgroundColor: '#fcfcfc'}}>
				<Row>
					<h1 style={{ textAlign: 'center' }}>{props.fullName}</h1>
				</Row>
				<Row style={{ maxHeight: '250px'}}>
					<Image src={props.imgUrl} thumbnail style={{ maxHeight: '250px', display: 'block', margin: '0 auto'}} />
				</Row>
			</Panel.Body>
		</Panel>
	);
}


Tmow.propTypes = {
	teamName: PropTypes.string.isRequired,
	imgUrl: PropTypes.string,
	fullName: PropTypes.string.isRequired,
	teamColor: PropTypes.string
}

const defaultImgUrl = 'img/default-avatar.png';
Tmow.defaultProps = {
	imgUrl: defaultImgUrl
}

class TmowConatiner extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      teams: []
    }

    this.defaultImgUrl = 'img/default-avatar.png';

    api.subscribe((data) => {
      this.setState({ teams: data });
    });
  }

  render() {
    const teamMembers = this.state.teams.map((team) => {
      return <Col md={4}><Tmow teamName={team.teamName} fullName={team.fullName} imgUrl={ team.imgUrl || this.defaultImgUrl } teamColor={team.teamColor}/></Col>;
    });

    return (
      <div>
        <PageHeader style={{textAlign: 'center'}}>Team Members of the Week!</PageHeader>
        <Row>{ teamMembers }</Row>
      </div>
    );
  }
}

export default TmowConatiner;
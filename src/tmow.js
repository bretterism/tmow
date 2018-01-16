import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Col, Image } from 'react-bootstrap';

const Tmow = (props) => {
	return (
		<Panel style={{margin: '25px'}}>
			<Panel.Heading style={{backgroundColor: props.teamColor}}>
				<h1 style={{textAlign: 'center', fontSize: '300%'}}><strong>{props.teamName}</strong></h1>
			</Panel.Heading>
			<Panel.Body style={{backgroundColor: '#fcfcfc'}}>
				<Col md={4} style={{height: '100px'}}>
					<Image src={props.imgUrl} thumbnail style={{maxHeight: '100%', maxWidth: '100%'}} />
				</Col>
				<Col md={8}>
					<h1>{props.fullName}</h1>
				</Col>
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

export default Tmow;
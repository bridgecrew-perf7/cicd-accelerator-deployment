import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'
import constants from '../Constants/serviceconstants'

const login = {
	background: "white",
	boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
	width: "-webkit-fill-available",
	padding: "12px 	20px",
	margin: "8px 0",
	border: "1px solid #ccc",
	borderRadius: "4px",
    boxSizing: "border-box"
}

export default class Login extends Component {
	
	constructor() {
		super()
		
		this.state = {
			username: '',
			password: ''
		}
	}
	
	changeHandler = (event) => {
		this.setState(
			{
				username: event.target.value,
				password: event.target.value
			}
		)
	}
	
	componentDidMount() {
		sessionStorage.clear()		
		console.log('http://'+constants.BACKENDLOCALHOST+':'+constants.BACKENDPORT+'/api/checkUser')
 		axios.get('http://'+constants.BACKENDLOCALHOST+':'+constants.BACKENDPORT+'/')
		.then(resp => {
			console.log(resp)
			if(resp.data === null || resp.data === undefined) {
				alert('Backend service not available')
			}
		})
	}
	
	submit = () => {
		axios.get('http://'+constants.BACKENDLOCALHOST+':'+constants.BACKENDPORT+'/api/checkUser', {
			params: {
				username: this.state.username,
				password: this.state.password
			}
		}).then(resp => {
			console.log(resp.data)
			if(resp.data == "Authorized") {				
				this.props.history.push('/home', {username: this.state.username})
				console.log(this.props.history.location.state.username)
				sessionStorage.setItem('name', this.props.history.location.state.username);
			}
			else {
				alert('Username or password is incorrect')				
			}
		})
	}
	
	render() {
		
		return(
			<Container>
			  <Row xl>
				<Col xl></Col>
				<Col xl>
					<div style={login}>
						<Form>
							<center>
								<Form.Label>Sign In</Form.Label>
								<Form.Group controlId="formBasicEmail">
							<Form.Label>Enter username</Form.Label>
							<Form.Control type="input" autoComplete="off" placeholder="Enter username" onChange={this.changeHandler}/>
							</Form.Group>
					  <Form.Group controlId="formBasicPassword">
						<Form.Label>Enter password</Form.Label>
						<Form.Control type="password" autoComplete="off" placeholder="Password" onChange={this.changeHandler}/>
					  </Form.Group>
					  </center>
					</Form>
					<center>
					<ButtonGroup size="lg" className="mb-3">
						<Button onClick={this.submit} id="submitBtn">Submit</Button>
					</ButtonGroup>
					</center>
					</div>				
				</Col>
				<Col xl></Col>
			  </Row>
			</Container>
		)
	}
}
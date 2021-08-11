import { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import AccordionList from '../../AccordionList'
import axios from 'axios'

const header = {
	backgroundColor: "wheat",
	height: "80px",
}

const form = {
	padding: "0px 10px"
}

export default class BuildServer extends Component {	
	
	constructor() {
		super()
		
		this.state = {			
			buildServerURL: '',
			buildServerUsername: '',
			buildServerPassword: '',
			buildServerName: ''
        }
		this.buildServerDetails = []
		this.buildServerName = ""
    }		
	
	changeHandler = (event) => {
		this.setState(
			{ 
				buildServerURL: document.getElementById('formPlaintextURL').value,				
				buildServerUsername: document.getElementById('formBasicEmail').value,		
				buildServerPassword: document.getElementById('formBasicPassword').value,		
				buildServerName: document.getElementById('formBasicServerName').value		
			}
		)		
	}
	
	submit = (e) => {		
		
		this.buildServerDetails.push({
			"buildServerURL": this.state.buildServerURL,
			"buildServerUsername": this.state.buildServerUsername,
			"buildServerPassword": this.state.buildServerPassword,
			"buildServerName": this.state.buildServerName,
		})
		
		const data = this.buildServerDetails
		
		console.log(data)
		axios.post('http://localhost:3000/api/addBuildServer', {data})
		.then(res => {
			console.log(res)
		})
		
		this.buildServerDetails = []
	}
	
	checkServerName = () => {
		this.buildServerName = document.getElementById('formBasicServerName').value
		//alert(buildServerName)
		
		const data = this.buildServerName
		
	axios.post('http://localhost:3000/api/checkServerName', {data})
		.then(res => {
			console.log(res)
		})
	}
	
	
	render() {
		
		return (
			<div>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper style={ header }>
						<center>
							<p style={{ padding: "25px 0px" }}>CNAP Build Server Configuration</p>
						</center>
					</Paper>
				</Grid>				
			</Grid>
			<Grid container spacing={3}>
			<Grid item sm={3}>
				<AccordionList />
			</Grid>	
			<Grid item xs={9}>
					<Form style={ form }>
					  <Form.Group as={Row} controlId="formPlaintextURL">
						<Form.Label column sm="3">
						  Build Server URL
						</Form.Label>
						<Col sm="5">
						  <Form.Control type="text" placeholder="Enter the build server url" onChange={this.changeHandler}/>
						</Col>
					  </Form.Group>
					  
					  <Form.Group as={Row} controlId="formBasicEmail">
						<Form.Label column sm="3">
						  Username
						</Form.Label>
						<Col sm="5">
						  <Form.Control type="text" placeholder="Enter jenkins username" onChange={this.changeHandler}/>
						</Col>
					  </Form.Group>

					  <Form.Group as={Row} controlId="formBasicPassword">
						<Form.Label column sm="3">
						  Password
						</Form.Label>
						<Col sm="5">
						  <Form.Control type="password" placeholder="Enter jenkins password" onChange={this.changeHandler}/>
						</Col>
					  </Form.Group>

					  <Form.Group as={Row} controlId="formBasicServerName">
						<Form.Label column sm="3">
						  Server Name
						</Form.Label>
						<Col sm="5">
						  <Form.Control type="text" placeholder="Enter server name" onChange={this.changeHandler} onBlur={this.checkServerName}/>
						</Col>
					  </Form.Group>					  
					  <Col lg="10">
						<Button onClick={this.submit} > Submit </Button>
					  </Col>
					</Form>
			</Grid>			
			</Grid>			
			</div>
		)
	}
	
}
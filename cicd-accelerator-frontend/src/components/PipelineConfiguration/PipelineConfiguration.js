import { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AccordionList from '../../AccordionList'

const header = {
	backgroundColor: "wheat",
	height: "80px",
}

const form = {
	padding: "0px 10px"
}

export default class PipelineConfiguration extends Component {
	
	
	constructor() {
		super()
		
		this.state = {
			isVisible: false,
			displayConf: "none",
			technology: "null",
			pipelineName: "",
			buildServerName: "",
			scmName: "",
			scmURL: "",
			scmUsername: "",
			scmPassword: "",
			technologyName: "",
			buildToolName: "",
			unitTestToolName: "",
			packagingFormat: "",
			repoURL: "",
			scmList: [
				{
					"name": "None"
				},
				{
					"name": "Git"
				},				
				{
					"name": "BitBucket"
				},				
				{
					"name": "Mercury"
				}
			],
			technologyList: [
				{
					"name": "None"
				},
				{
					"name": "Java"
				},
				{
					"name": "C"
				},
				{
					"name": "CPP"
				},
				{
					"name": "Python"
				}
			],
			buildList: [
				{
					"name": "Ant",
					"Technology": "Java"
				},				
				{
					"name": "Maven",
					"Technology": "Java"
				},				
				{
					"name": "Gradle",
					"Technology": "Java"
				},
				{
					"name": "PyBuilder",
					"Technology": "Python"
				}
			],
			testList: [
				{
					"name": "JUnit",
					"Technology": "Java"
				},				
				{
					"name": "CPPTest",
					"Technology": "CPP"
				},				
				{
					"name": "CPPTest",
					"Technology": "C"
				},
				{
					"name": "PyTest",
					"Technology": "Python"
				}
			],
			packageList: [
				{
					"name": "jar",
					"Technology": "Java"
				},
				{
					"name": "war",
					"Technology": "Java"
				},				
				{
					"name": "Tar",
					"Technology": "CPP"
				},				
				{
					"name": "Zip",
					"Technology": "C"
				},
				{
					"name": "Zip",
					"Technology": "Python"
				},
				{
					"name": "Whl",
					"Technology": "Python"
				}
			],			
			buildServers: [
			
				{
					"name": "None",
					"id": 0
				},
				{
					"name": "CNAP_Build_Server",
					"id": 1
				},
				{
					"name": "Wipro_Build_Server",
					"id": 2
				}
			],
			pipelines: [
				{
					"name": "cnap_test_pipeline",
					"buildServer": "CNAP_Build_Server"
				},
				{
					"name": "cnap_sample_pipeline",
					"buildServer": "CNAP_Build_Server"
				},
				{
					"name": "wipro_test_pipeline",
					"buildServer": "Wipro_Build_Server"
				},
				{
					"name": "wipro_sample_pipeline",
					"buildServer": "Wipro_Build_Server"
				}
			]
		}
	}
	
	clickEvent = (event) => {
		this.setState({
			displayConf: "block"
		})
	}
	
	modalShow = () => {
		this.setState({
			isVisible: true
		})
	}
	
	setTechnology = (event) => {
		this.setState({
			technology: event.target.value
		})
	}
	
	handleClose = () => {
		this.setState({
			isVisible: false
		})
	}
	
	handlerChange = () => {
		this.setState({
			scmUsername: document.getElementById('scmUsername').value
		})
	}
	
	getValue = (e) => {
		console.log(e.target.value)
	}
	
	submit = () => {
		console.log(this.state.scmUsername)
	}
	
	render() {
		
		return (
			<div>
			<div style={{ backgroundColor: "white" }}>
				<Modal
					show={this.state.isVisible}
					onHide={this.handleClose}
					backdrop="static"
					keyboard={false}
				  >
					<Modal.Header closeButton>
					  <Modal.Title> SCM authentication details</Modal.Title>
					</Modal.Header>
					<Modal.Body id="modalBody">
						<center>
						<Form style={ form }>
						  <Form.Group as={Row} controlId="scmUsername">
							<Form.Label column sm="5">
							  SCM Username
							</Form.Label>
							<Col sm="7">
							  <Form.Control type="text" autoComplete="off" placeholder="Enter SCM username" onChange={this.handlerChange}/>
							</Col>
						  </Form.Group>
						  <Form.Group as={Row} controlId="scmPassword">
							<Form.Label column sm="5">
							  SCM Password
							</Form.Label>
							<Col sm="7">
							  <Form.Control type="password" placeholder="Enter SCM password" />
							</Col>
						  </Form.Group>
						</Form>  
						</center>
					</Modal.Body>
					<Modal.Footer>
					  <Button variant="primary" onClick={this.handleClose}>
						Save
					  </Button>					  
					</Modal.Footer>
				  </Modal>				
				</div>			
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper style={ header }>
						<center>
							<p style={{ padding: "25px 0px" }}>CNAP Pipeline Configuration</p>
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
					  <Form.Group as={Row} controlId="formPlaintextEmail">
						<Form.Label column sm="3">
						  Pipeline Name
						</Form.Label>
						<Col sm="5">
						  <Form.Control type="text" placeholder="Enter pipeline name" />
						</Col>
					  </Form.Group>
					  
					  <Form.Group as={Row}>
						<Form.Label column sm="3">
						  Build Server
						</Form.Label>
						<Col sm="5">
						      <Form.Control as="select" custom onChange={this.clickEvent}>
							  {
								  this.state.buildServers.map(buildServer => 
									<option> { buildServer.name } </option>
								  )
							  }
							</Form.Control>
						</Col>
					  </Form.Group>
					  <div style={{ display: `${this.state.displayConf}` }}>
						  <Form.Group as={Row}>
							<Form.Label column sm="3">
							  SCM Name
							</Form.Label>
							<Col sm="5">
							  	<Form.Control as="select" custom onChange={this.getValue}>
							  {
								  this.state.scmList.map(scm => 
									<option> { scm.name } </option>
								  )
							  }
							</Form.Control>
							</Col>
						  </Form.Group>
					  <Form.Group as={Row} controlId="scmURL">
						<Form.Label column sm="3">
						  SCM URL Name
						</Form.Label>
						<Col sm="5">
						  <Form.Control type="text" placeholder="Enter SCM url" onClick={this.modalShow}/>
						</Col>
					  </Form.Group>	
						  <Form.Group as={Row}>
							<Form.Label column sm="3">
							  Technology Name
							</Form.Label>
							<Col sm="5">
							  <Form.Control as="select" custom onChange={this.setTechnology}>
							  {
								  this.state.technologyList.map(technology => 
									<option> { technology.name } </option>
								  )
							  }
							</Form.Control>
							</Col>
						  </Form.Group>					
						  <Form.Group as={Row}>
							<Form.Label column sm="3">
							  Build Tool Name
							</Form.Label>
							<Col sm="5">
							<Form.Control as="select" custom>
							  {
								  this.state.buildList.map(build => 
									(this.state.technology === build.Technology) ? (<option> { build.name } </option>) : ("")
								  )
							  }
							</Form.Control>
							</Col>
						  </Form.Group>
						  <Form.Group as={Row}>
							<Form.Label column sm="3">
							  Unit Test Tool Name
							</Form.Label>
							<Col sm="5">
							<Form.Control as="select" custom>
							  {
								  this.state.testList.map(test => 
									(this.state.technology === test.Technology) ? (<option> { test.name } </option>) : ("")
								  )
							  }
							</Form.Control>
							</Col>
						  </Form.Group>
						  <Form.Group as={Row}>
							<Form.Label column sm="3">
							  Packaging Format
							</Form.Label>
							<Col sm="5">
							<Form.Control as="select" custom>
							  {
								  this.state.packageList.map(pkg => 
									(this.state.technology === pkg.Technology) ? (<option> { pkg.name } </option>) : ("")
								  )
							  }
							</Form.Control>
							</Col>
						  </Form.Group>
						  <Form.Group as={Row}>
							<Form.Label column sm="3">
							  Repository URL
							</Form.Label>
							<Col sm="5">
							  	<Form.Control type="text" placeholder="Enter repository URL" />								
							</Col>
						  </Form.Group>
							  <Button variant="primary" style={{ marginLeft: "-120px" }} onClick={this.submit}>
								Submit
							  </Button>	
							  <Button variant="primary" type="submit" style={{ marginLeft: "10px" }}>
								Reset
							  </Button>	
					  </div>
					</Form>
			</Grid>	
			</Grid>
			</div>
		)
	}
	
}
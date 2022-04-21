import { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import AccordionList from '../../AccordionList'
import axios from 'axios'
import constants from '../Constants/serviceconstants'

const header = {
	backgroundColor: "wheat",
	height: "80px",
}

const form = {
	padding: "0px 10px"
}

export default class DeployServer extends Component {
	
	constructor() {
		super()
		
		
		this.state = {
			setDeploymentType: "",
			serverTag: [
				{
					"name": "Linux",
					 "value": "linux",
					 "id": 0
				},
				{
					"name": "Windows",
					 "value": "windows",
					 "id": 1
				}			
			],
			deploymentType: [
				{
					"id": 0,
					"type": "None"
				},
				{
					"id": "serverDeployment",
					"type": "Server Deployment"
				},
				{
					"id": "kubeDeployment",
					"type": "Kubernetes Deployment"
				}
			],
			pipelines: [
				/* {
					"name": "None",
					"buildServer": "None"
				},
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
				} */
			]
		}
	}
	
	setDeploymentType = (event) => {		
		this.setState({
			setDeploymentType: event.target.value
		})
	}
	
	componentDidMount() {
		axios.get('http://'+constants.BACKENDLOCALHOST+':'+constants.BACKENDPORT+'/api/getPipelines')
		.then(res => {
			this.setState({
				pipelines: res.data
			})
		})		
	}	
	
	render() {
		return (
			<div>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper style={ header }>
						<center>
							<p style={{ padding: "25px 0px" }}><span style={{ fontSize:"25px", fontWeight: "500" }}>CNAP DeployServer Configuration</span></p>
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
						  DeployServer Name
						</Form.Label>
						<Col sm="5">
						  <Form.Control type="text" placeholder="Enter deploy server name" />
						</Col>
					  </Form.Group>
					  <Form.Group as={Row}>
						<Form.Label column sm="3">
						  Pipeline Name
						</Form.Label>
						<Col sm="5">
						      <Form.Control as="select" custom onChange={this.clickEvent} id="pipelineName">
								<option> None </option>
							  {
								  this.state.pipelines.map(pipeline => 
									<option> { pipeline.name } </option>
								  )
							  }
							</Form.Control>
						</Col>
					  </Form.Group>
					  <Form.Group as={Row}>
						<Form.Label column sm="3">
						  Deployment Type
						</Form.Label>
						<Col sm="5">
						      <Form.Control as="select" custom onChange={this.setDeploymentType} id="deploymentType">
							  {
								  this.state.deploymentType.map(deploymentType => 
									 <option> { deploymentType.type } </option>									
								  )
							  }
							</Form.Control>
						</Col>
					  </Form.Group>
					  <div style={{ display: (this.state.setDeploymentType === "Server Deployment") ? "block" : "none" }}>
						  <Form.Group as={Row} controlId="formPlaintextEmail">
							<Form.Label column sm="3">
							  Target Server
							</Form.Label>
							<Col sm="5">
							  <Form.Control type="text" placeholder="Enter target server ip" />
							</Col>
						  </Form.Group>
						  <Form.Group as={Row} controlId="formPlaintextEmail">
							<Form.Label column sm="3">
							  Server Tag
							</Form.Label>
							<Col sm="5">
							  <Form.Control as="select" custom onChange={ this.getServerTag }>
								  <option> None </option>	
								  {
									  this.state.serverTag.map(server => 											
											<option> {server.name} </option>
									  )
								  }
							  </Form.Control>
							</Col>
						  </Form.Group>							  
						  <Form.Group as={Row} controlId="formPlaintextEmail">
							<Form.Label column sm="3">
							  Target Server Username
							</Form.Label>
							<Col sm="5">
							  <Form.Control type="text" placeholder="Enter target server username" />
							</Col>
						  </Form.Group>	
						  <Form.Group as={Row} controlId="formPlaintextEmail">
							<Form.Label column sm="3">
							  Target Server Password
							</Form.Label>
							<Col sm="5">
							  <Form.Control type="password" placeholder="Enter target server password" />
							</Col>
						  </Form.Group>
					  </div>
					  <div style={{ display: (this.state.setDeploymentType === "Kubernetes Deployment") ? "block" : "none" }}>
						  <Form.Group as={Row} controlId="formPlaintextEmail">
							<Form.Label column sm="3">
							  Cluster Name
							</Form.Label>
							<Col sm="5">
							  <Form.Control type="text" placeholder="Enter K8 Cluster Name" />
							</Col>
						  </Form.Group>	
					  </div>					  
					  <Button variant="primary" type="submit" style={{ marginLeft: "-120px" }}>
						Submit
					  </Button>					  
					</Form>
			</Grid>	
			</Grid>
			</div>
		)
	}
	
}
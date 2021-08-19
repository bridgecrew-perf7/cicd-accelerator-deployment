import { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'	
import Button from 'react-bootstrap/Button'	
import Card from 'react-bootstrap/Card'	
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default class AccordionList extends Component {
	
	constructor() {
		super()
		
		this.state = {
			buildServers: [
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
			],
			deployServers: [
				{
					"name": "CNAP_Deploy_Server",
					"id": 1
				},
				{
					"name": "Wipro_Deploy_Server",
					"id": 2
				}
			]
		}
	}
	
	render() {
		
		const buildServer = this.state.buildServers.map(buildServer => 
			<p key={buildServer.id} > { buildServer.name } <span><CancelIcon color='error' onClick={() => alert(`${buildServer.name} is getting deleted`)}/></span></p>  
		)
		
		const pipeline = this.state.pipelines.map((item, index) => 
			<p key={index}> {item.name} <span><CancelIcon color='error' onClick={() => alert(`${item.name} is getting deleted`)}/></span></p>
		)
		const deployServer = this.state.deployServers.map((item, index) => 
			<p key={index}> {item.name} <span><CancelIcon color='error' onClick={() => alert(`${item.name} is getting deleted`)}/></span></p>
		)
		
		return (
			<div>
				<Accordion>
				  <Card>
					<Card.Header>
					  <Accordion.Toggle as={Button} variant="link">
						<center>
							<a href="/home"> Dashboard </a>
						</center>
					  </Accordion.Toggle>
					</Card.Header>
				  </Card>				
				  <Card>
					<Card.Header>
					  <Accordion.Toggle as={Button} variant="link" eventKey="1">
						<center>
							Build Server <span><a href="/buildServer"><AddCircleIcon /></a></span>
						</center>
					  </Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="1">
					  <Card.Body>{ buildServer }</Card.Body>
					</Accordion.Collapse>
				  </Card>
				  <Card>
					<Card.Header>
					  <Accordion.Toggle as={Button} variant="link" eventKey="2">
					  <center>
						Pipeline Configuration <span><a href="/pipelineConfiguration"><AddCircleIcon /></a></span>
					  </center>
					  </Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="2">
					  <Card.Body>{ pipeline }</Card.Body>
					</Accordion.Collapse>
				  </Card>
					<Card>
					<Card.Header>
					  <Accordion.Toggle as={Button} variant="link" eventKey="3">
						Deployment Server <span><a href="/deployServer"><AddCircleIcon /></a></span>
					  </Accordion.Toggle>
					</Card.Header>
					<Accordion.Collapse eventKey="3">
					  <Card.Body>{ deployServer }</Card.Body>
					</Accordion.Collapse>
				  </Card>
					<Card>
					<Card.Header>
					  <Accordion.Toggle as={Button} variant="link" eventKey="4">
						<a href="/settings"> Settings </a>
					  </Accordion.Toggle>
					</Card.Header>
				  </Card>				  
				</Accordion>
			</div>
		)
	}
	
}
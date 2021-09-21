import { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'	
import Button from 'react-bootstrap/Button'	
import Card from 'react-bootstrap/Card'	
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'

export default class AccordionList extends Component {
	
	constructor() {
		super()
		
		this.state = {
			buildServers: [],
			pipelines: [
				/* {
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
	
	componentDidMount() {
		
		axios.get('http://localhost:3001/api/getBuildServers')
		.then(res => {			
			this.setState({
				buildServers: res.data
			})
			//console.log(this.state.buildServers)
		})
		
		axios.get('http://localhost:3001/api/getPipelines')
		.then(res => {
			//console.log(res.data)
			this.setState({
				pipelines: res.data
			})
		})
	}
	
	
	render() {
		
		
		
		const buildServer = this.state.buildServers.map(buildServer => 
			<p key={buildServer.key} > { buildServer.name } <span onClick={(e) => axios.delete('http://localhost:3001/api/deleteBuildServer/'+buildServer.name).then(res => {console.log(res)})}><CancelIcon color='error'/></span></p>  
		)
		
		const pipeline = this.state.pipelines.map((item, index) => 
			<p key={index}> {item.name} <span><a href="/pipelineConfiguration" ><EditIcon style={{ color: "green" }}></EditIcon></a></span> <span><PlayCircleFilledIcon style={{ color: "green" }} onClick={(e) => axios.get('http://localhost:3001/api/triggerPipeline/'+item.name).then(res => {console.log(res)})}/></span> <span><CancelIcon color='error' onClick={(e) => axios.delete('http://localhost:3001/api/deletePipeline/'+item.name).then(res => {console.log(res)})}/></span></p>
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
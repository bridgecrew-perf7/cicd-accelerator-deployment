import { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'	
import Button from 'react-bootstrap/Button'	
import Card from 'react-bootstrap/Card'	
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-bootstrap/Modal'
import axios from 'axios'


export default class AccordionList extends Component {
	
	constructor() {
		super()
		
		this.state = {
			buildServers: [],
			isVisible: false,
			pipelineName: "",
			modal: "",
			event:"",
			pipelines: [
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
	
	handleClose = () => {
		this.setState({
			isVisible: false
		})	
	}
	
	deleteConfirmation(item, e){
		this.setState({
			event: e.nativeEvent.path[1].id
		})
		this.setState({
			pipelineName: item.name
		})
		this.setState({
			isVisible: true
		})		
	}
	
	deletePipeline(item) {
		//axios.delete('http://localhost:3001/api/deletePipeline/'+item.name).then(res => {console.log(res)})		
		console.log(item)
	}
	
	triggerConfirmation(item, e) {
		console.log(e.nativeEvent.path[1])
		this.setState({
			event: e.nativeEvent.path[1].id
		})
		console.log(e.nativeEvent.path[1].id)
		this.setState({
			pipelineName: item.name
		})
		this.setState({
			isVisible: true
		})		
	}
	
	triggerPipeline(item) {
		axios.get('http://localhost:3001/api/triggerPipeline/'+item).then(res => {console.log(res)})
	}
	
	
	render() {
		
		var modal = this.state.modal;
		
		const buildServer = this.state.buildServers.map(buildServer => 
			<p key={buildServer.key} > { buildServer.name } <span onClick={(e) => axios.delete('http://localhost:3001/api/deleteBuildServer/'+buildServer.name).then(res => {console.log(res)})}><CancelIcon color='error'/></span></p>  
		)
		
		const pipeline = this.state.pipelines.map((item, index) => 
			<p key={index}> {item.name} <span><a href="/pipelineConfiguration" ><EditIcon style={{ color: "green" }}></EditIcon></a></span> <span id="trigger" style={{ cursor: "pointer" }}><PlayCircleFilledIcon style={{ color: "green", fontSize: "25px" }} onClick={(e) => this.triggerConfirmation(item, e)}/></span> <span id="delete" style={{ cursor: "pointer" }}><CancelIcon color='error' style={{ fontSize: "25px" }} onClick={(e) => this.deleteConfirmation(item, e)}/></span></p>
		)		
		

		const deployServer = this.state.deployServers.map((item, index) => 
			<p key={index}> {item.name} <span><CancelIcon color='error' onClick={() => alert(`${item.name} is getting deleted`)}/></span></p>
		)
		
		
		
		if(this.state.event == "trigger") {
			modal= 
			<div>
			<Modal.Body id="modalBody">
						<center>
							<div>
								Do you want to trigger pipeline { this.state.pipelineName }?
							</div>
						</center>
					</Modal.Body>
				<Modal.Footer>
					  <Button variant="primary" onClick={ () => {this.handleClose(); this.triggerPipeline(this.state.pipelineName)}}>
						Yes
					  </Button>
					  <Button variant="primary" onClick={this.handleClose}>
						No
					  </Button>					  
				</Modal.Footer>
			</div>
		}
		else if(this.state.event == "delete") {
			modal= 
			<div>
			<Modal.Body id="modalBody">
						<center>
							<div>
								Do you want to delete pipeline { this.state.pipelineName }?
							</div>
						</center>
					</Modal.Body>
					<Modal.Footer>
					  <Button variant="primary" onClick={ () => {this.handleClose(); this.deletePipeline(this.state.pipelineName)}}>
						Yes
					  </Button>
					  <Button variant="primary" onClick={this.handleClose}>
						No
					  </Button>					  
					</Modal.Footer>	
			</div>
		}
		
		return (
			<div>
				  <Modal
					show={this.state.isVisible}
					onHide={this.handleClose}
					backdrop={true}
					keyboard={true}					
					size='lg'
				  >
					<Modal.Header closeButton>
					  <Modal.Title>{ this.state.pipelineName }</Modal.Title>
					</Modal.Header>
						{ modal }
				  </Modal>			
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
							Build Server <span><a href="/buildServer"><AddCircleIcon id="buildServerIcon"/></a></span>
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
						Pipeline Configuration <span><a href="/pipelineConfiguration"><AddCircleIcon id="pipelineConfIcon"/></a></span>
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
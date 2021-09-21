import { Component } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import axios from 'axios'

export default class Dashboard extends Component {
	
	constructor() {
		super()
		
		this.state = {
			isVisible: false,
			pipelineName: "",
			username: "",
			pipelines: [],
			pipelineLogs: ""
			
		}
	}
	
	modalDisplay = (e) => {
		axios.get('http://localhost:3001/api/getPipelineLogs/'+e.name)
		.then(res => {
			console.log(res.data)
			 this.setState({
				pipelineLogs: res.data
			})
		})		
		this.setState({
			isVisible: true
		})
		this.setState({
			pipelineName: e.name
		})
		
		
		
	}
	
	handleClose = () => {
		this.setState({
			isVisible: false
		})
		
		this.setState({
			pipelineLogs: ""
		})
	}
	
	componentDidMount(){
		axios.get('http://localhost:3001/api/getPipelines')
		.then(res => {
			//console.log(res.data)
			 this.setState({
				pipelines: res.data
			})
		})
	}
	

	
	render() {
				
		
		console.log((this.state.pipeline))
		

		
		return (
			<div>
 				<center>
					<TableContainer component={Paper}>
					  <Table aria-label="simple table">
						<TableHead>
						  <TableRow style={{ backgroundColor: "LightGray" }}>
							<TableCell>Name </TableCell>
							<TableCell align="right">Status</TableCell>
							<TableCell align="right">Build Server</TableCell>
						  </TableRow>
						</TableHead>
						<TableBody>
						  {
						  	this.state.pipelines.map((pipline) => (pipline.isSuccess === "inprogress") ? (
							<TableRow key={pipline.name} style={{ backgroundColor: "DodgerBlue" }} onClick={() => this.modalDisplay(pipline)}>
							  <TableCell component="th" scope="row">
								{pipline.name}
							  </TableCell>
							  <TableCell align="right">{pipline.isSuccess}</TableCell>
							  <TableCell align="right">{pipline.buildServer}</TableCell>
							</TableRow>
						  ) : (""))
						  }						
						  {
							this.state.pipelines.map((pipline) => (pipline.isSuccess === "succeeded") ? (
							<TableRow key={pipline.name} style={{ backgroundColor: "MediumSeaGreen" }} onClick={() => this.modalDisplay(pipline)}>
							  <TableCell component="th" scope="row">
								{pipline.name}
							  </TableCell>
							  <TableCell align="right">{pipline.isSuccess}</TableCell>
							  <TableCell align="right">{pipline.buildServer}</TableCell>
							</TableRow>
						  ) : (""))}
						  {
						  	this.state.pipelines.map((pipline) => (pipline.isSuccess === "failed") ? (
							<TableRow key={pipline.name} style={{ backgroundColor: "Tomato" }} onClick={() => this.modalDisplay(pipline)}>
							  <TableCell component="th" scope="row">
								{pipline.name}
							  </TableCell>
							  <TableCell align="right">{pipline.isSuccess}</TableCell>
							  <TableCell align="right">{pipline.buildServer}</TableCell>
							</TableRow>
						  ) : (""))
						  }
						</TableBody>
					  </Table>
					</TableContainer>
				</center>
				<div style={{ backgroundColor: "white" }}>
				  <Modal
					show={this.state.isVisible}
					onHide={this.handleClose}
					backdrop={true}
					keyboard={true}
					fullscreen={true}
					size='xl'
				  >
					<Modal.Header closeButton>
					  <Modal.Title>{ this.state.pipelineName } details</Modal.Title>
					</Modal.Header>
					<Modal.Body id="modalBody">
						<center>
							<div>
								{ this.state.pipelineLogs }
							</div>
						</center>
					</Modal.Body>
					<Modal.Footer>
					  <Button variant="primary" onClick={this.handleClose}>
						Close
					  </Button>					  
					</Modal.Footer>
				  </Modal>				
				</div> 
			</div>
		)
	}
	
}
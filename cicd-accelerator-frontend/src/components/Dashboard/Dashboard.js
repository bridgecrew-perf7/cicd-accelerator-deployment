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
			pipelines: [
				{
					"name": "cnap_test_pipeline",
					"buildServer": "CNAP_Build_Server",
					"isSuccess": "failed",
					"stages": [{
						"gitPull": "success",
						"mvnBuild": "success",
						"packaging": "failed"
					}]
				},
				{
					"name": "cnap_sample_pipeline",
					"buildServer": "CNAP_Build_Server",
					"isSuccess": "succeeded",
					"stages": [{
						"gitPull": "success",
						"mvnBuild": "success",
						"packaging": "success"
					}]					
				},
				{
					"name": "wipro_test_pipeline",
					"buildServer": "Wipro_Build_Server",
					"isSuccess": "failed",
					"stages": [{
						"gitPull": "success",
						"mvnBuild": "success",
						"packaging": "success"
					}]
				},
				{
					"name": "wipro_sample_pipeline",
					"buildServer": "Wipro_Build_Server",
					"isSuccess": "succeeded",
					"stages": [{
						"gitPull": "success",
						"mvnBuild": "success",
						"packaging": "success"
					}]
				},
				{
					"name": "wipro_new_pipeline",
					"buildServer": "Wipro_Build_Server",
					"isSuccess": "inprogress",
					"stages": [{
						"gitPull": "success",
						"mvnBuild": "success",
						"packaging": "inprogress"
					}]					
				}				
			],
			pipeline: []
			
		}
	}
	
	modalDisplay = (e) => {
		this.setState({
			isVisible: true
		})
		this.setState({
			pipelineName: e.name
		})
		var pipelineDetails = {
			"gitPull": e.stages[0].gitPull,
			"mvnBuild": e.stages[0].mvnBuild,
			"packaging": e.stages[0].packaging			
		}
		//console.log(pipelineDetails)
		
		this.state.pipeline.push(pipelineDetails)
		
		//console.log(this.state.pipeline)
	}
	
	handleClose = () => {
		this.setState({
			isVisible: false
		})
		
		this.setState({
			pipeline: []
		})
	}
	

	
	render() {
				
		
		console.log((this.state.pipeline))
		
		const pipelineStages = this.state.pipeline.map((item, index) =>				
		<div>
 			<Stepper> 
				<Step active={item.gitPull === "success" ? true : false}>
					<StepLabel> GitPull </StepLabel>
				</Step>
				<Step active={item.mvnBuild === "success" ? true : false}>
					<StepLabel> MVN Build </StepLabel>
				</Step>				
				<Step active={item.testing === "success" ? true : false}>
					<StepLabel> Testing </StepLabel>
				</Step>					
			</Stepper>			
		</div>
		)
		
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
					backdrop="static"
					keyboard={false}
				  >
					<Modal.Header closeButton>
					  <Modal.Title>{ this.state.pipelineName } details</Modal.Title>
					</Modal.Header>
					<Modal.Body id="modalBody">
						<center>
							<div>
								{ pipelineStages }
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
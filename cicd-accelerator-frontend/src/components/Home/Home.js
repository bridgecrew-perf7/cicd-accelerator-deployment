import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AccordionList from '../../AccordionList'
import Dashboard from '../Dashboard/Dashboard'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const header = {
	backgroundColor: "wheat",
	height: "80px"
}

export default class Home extends Component {
	
	
	constructor() {
		super()
		
		this.state = {
			username: ""
		}
	}
	
	componentDidMount() {
		var username = sessionStorage.getItem('name')
		console.log(username)
		this.setState({
			username: username
		})	
	}
	
	logout = () => {
		sessionStorage.clear()
	}

	render() {
		return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper style={header}>
						<center style={{ padding: "25px 0px" }}>
							<h3>CNAP sample react CICD dashboard</h3><p style={{ float: "right", margin: "-35px 0px" }}> { this.state.username } <a href="/login"> <span> <ExitToAppIcon style={{ fontSize: "30px", color: "action" }} onClick={() => this.logout}/> </span> </a> </p>
						</center>
					</Paper>
				</Grid>				
			</Grid>
			<Grid container spacing={3}>
			<Grid item sm={3}>
				<AccordionList />
			</Grid>
			<Grid item sm={9}>
				<Dashboard />
			</Grid>
			</Grid>
		</>
		)
	
	}

}
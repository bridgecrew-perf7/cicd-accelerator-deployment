import { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AccordionList from '../../AccordionList'

const header = {
	backgroundColor: "wheat",
	height: "80px",
}

export default class Settings extends Component {
	
	render() {
		return (
			<div>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper style={ header }>
						<center>
							<p style={{ padding: "25px 0px" }}>CNAP Settings Configuration</p>
						</center>
					</Paper>
				</Grid>				
			</Grid>
			<Grid container spacing={3}>
			<Grid item sm={3}>
				<AccordionList />
			</Grid>	
			<Grid item xs={9}>

			</Grid>	
			</Grid>
			</div>
		)
	}
	
}
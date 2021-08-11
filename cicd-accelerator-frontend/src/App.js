import React, { Component } from 'react';
import Login from './components/Login/Login'  
import Home from './components/Home/Home'
import BuildServerConf from './components/BuildServer/BuildServer'  
import DeployServerConf from './components/DeployServer/DeployServer'  
import PipelineConfiguration from './components/PipelineConfiguration/PipelineConfiguration'  
import Settings from './components/Settings/Settings'  
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css'


class App extends Component {
	
	render() {
	  return (
	  <Router>
		<div className="App">
			<Route path='/' exact component={Login} />
			<Route path='/login'  component={Login} />
			<Route path='/home' component={Home} />
			<Route path='/buildServer' component={BuildServerConf} />
			<Route path='/deployServer' component={DeployServerConf} />
			<Route path='/pipelineConfiguration' component={PipelineConfiguration} />
			<Route path='/settings' component={Settings} />
		</div>
	  </Router>
     )	
	}
}

export default App;

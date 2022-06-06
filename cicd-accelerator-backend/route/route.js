var db = require('../db/db.js')
var core = require('../core/core.js')
const log = require('log-to-file');
var CONSTANTS = require('../constants/serviceconstants.js')
var fs = require('fs')

module.exports = {

	checkUser: function(req, res) {
		var username = (req.query.username)
		var password = (req.query.password)
		db.checkUser(username, password, function(pass, fail) {
			if(pass) {
				console.log(pass)				
				res.end(pass)
				log(pass, CONSTANTS.logPath,"\r\n")
				
			}
			else {				
				console.log((fail))
				res.end(fail)
				log(fail, CONSTANTS.logPath,"\r\n")
			}
		})
	},
	
	checkConnectivity: function(req, res) {
		db.checkConnectivity(function(pass, fail) {
			if(pass) {
				console.log(pass)				
				res.end(pass)				
				
			}
			else {				
				console.log((fail))
				res.end(fail)			
			}
		})
	},
	
	getPipelineDetails: function(req, res) {
		var pipelineName = req.query.pipelineName
		console.log(pipelineName)
		db.getPipelineDetails(pipelineName, function(pass, fail) {
			if(pass) {
				console.log(JSON.stringify(pass))				
				res.end(JSON.stringify(pass))
				log(JSON.stringify(pass), CONSTANTS.logPath,"\r\n")
			}
			else {
				console.log(fail)				
				res.end(fail)
				log(fail, CONSTANTS.logPath,"\r\n")
			}
		})
	},
	
	readLogs: function(req, res) {
		fs.exists(CONSTANTS.logPath, function(yes, no) {
			if(yes) {
				console.log('The file exists')
				fs.readFile(CONSTANTS.logPath, 'UTF-8', function(err, data) {
					if(err) {						
						console.log("Logs", err)						
					}
					else {						
						console.log(JSON.stringify(CONSTANTS.logPath))
						console.log("Logs", data)
						res.end(data)
					}
				})
			}
			else {
				console.log('The damn file does not exist')
			}
		})
	},
	
	checkServerName: function(req, res) {
		var checkDuplicateServerName = (req.query.serverName)
		db.checkServerName(checkDuplicateServerName, function(pass, fail) {
			if(pass) {				
				console.log(typeof(pass))				
				res.end(pass)
				log(pass, CONSTANTS.logPath,"\r\n")
			}
			else {
				console.log(fail)				
				res.end(fail)
				log(fail, CONSTANTS.logPath,"\r\n")
			}
		})
	},
	
	addBuildServer: function(req, res) {		
		var username = JSON.parse(req.query.data).buildServerUsername
		var password = JSON.parse(req.query.data).buildServerPassword
		var serverName = JSON.parse(req.query.data).buildServerName
		var serverURL = JSON.parse(req.query.data).buildServerURL
  		db.addBuildServer(username, password, serverName, serverURL, function(pass, fail) {
			if(pass) {
				console.log(pass)				
				res.end(pass)
				log(pass, CONSTANTS.logPath,"\r\n")
			}
			else {
				console.log(fail)			
				res.end(fail)
				log(fail, CONSTANTS.logPath,"\r\n")
			}
		})
	},
	
	getBuildServers: function(req, res) {
		db.getBuildServers(function(pass, fail) {
			if(pass) {
				//console.log(JSON.stringify(pass))
				res.end(JSON.stringify(pass))
				log(JSON.stringify(pass), CONSTANTS.logPath,"\r\n")
			}
			else {
				console.log(fail)				
				res.end(fail)
				log(fail, CONSTANTS.logPath,"\r\n")
			}			
		})
	},

	getPipelines: function(req, res) {
		db.getPipelines(function(pass, fail) {
			if(pass) {
				//console.log(JSON.stringify(pass))
				res.end(JSON.stringify(pass))
				log(JSON.stringify(pass), CONSTANTS.logPath,"\r\n")
			}
			else {
				console.log(fail)
				res.end(fail)
				log(fail, CONSTANTS.logPath,"\r\n")
			}			
		})
	},
	getPipelineLogs: function(req, res) {
		var pipelineName = req.params.pipelineName
		console.log(pipelineName)
 		db.getPipelineLogs(pipelineName, function(pass, fail) {
			if(pass) {			
				core.getPipelineLogs(pass, function(log_pass, log_fail) {
					if(log_pass) {
						console.log('In route.js')
						console.log(log_pass)
						res.end(JSON.stringify(log_pass))
						log(JSON.stringify(log_pass), CONSTANTS.logPath,"\r\n")
					}
					else {
						console.log(log_fail)
						log(log_fail, CONSTANTS.logPath,"\r\n")
					}
				})
			}
			else {
				console.log(fail)
				res.end(fail)
				log(fail, CONSTANTS.logPath,"\r\n")
			}
		})
	},
	

	deleteBuildServer: function(req, res) {
		console.log(req.params)
		var buildServerName = req.params.name
		db.deleteBuildServer(buildServerName, function(pass, fail) {
			if(pass) {
				//console.log(JSON.stringify(pass))
				res.end((pass))
				log(pass, CONSTANTS.logPath,"\r\n")
			}
			else {
				console.log(fail)
				res.end(fail)
				log(fail, CONSTANTS.logPath,"\r\n")
			}			
		})
	},
	deletePipeline: function(req, res) {
		console.log(req.params)
		var pipelineName = req.params.name
		console.log('In deletePipeline method')
		db.getPipelineInfo(pipelineName, function(info_pass, info_fail) {
			if(info_pass) {
				core.deletePipeline(info_pass, function(del_pass, del_fail){
					if(del_pass){
						db.deletePipeline(pipelineName, function(pass, fail) {
							if(pass) {				
								res.end((pass))
								log(pass, CONSTANTS.logPath,"\r\n")
							}
							else {
								console.log(fail)
								res.end(fail)
								log(fail, CONSTANTS.logPath,"\r\n")
							}			
						})				
					}
					else {
						console.log(del_fail)
						res.end(del_fail)
						log(del_fail, CONSTANTS.logPath,"\r\n")
					}
				})				
			}
			else {
				console.log(info_fail)
				log(del_fail, CONSTANTS.logPath,"\r\n")
			}
		})
	},
	
	addPipelineDetails: function(req, res) {
		var pipelineInputs = (req.body)
		var pipelineName = pipelineInputs.data.pipelineName
		var buildServerName = pipelineInputs.data.buildServerName		
		db.addPipelineDetails(pipelineName, buildServerName, pipelineInputs, function(pass, fail) {
			if(pass) {
				core.addPipelineDetails(pass, pipelineInputs, function(trigger_pass, trigger_fail) {
					if(trigger_pass) {
						console.log(trigger_pass)
						res.end(trigger_pass)
						log(trigger_pass, CONSTANTS.logPath,"\r\n")
					}
					else {
						console.log(trigger_fail)
						res.end(trigger_fail)
						log(trigger_fail, CONSTANTS.logPath,"\r\n")
					}
				})
			}
			else {
				console.log(fail) 
				res.end(fail)
				log(fail, CONSTANTS.logPath,"\r\n")
			}
		})
	},
	triggerPipeline: function(req, res) {
		var pipelineName = req.params.name
		console.log(pipelineName)
 		db.triggerPipeline(pipelineName, function(pass, fail) {
			if(pass) {			
				core.triggerPipeline(pass, function(trigger_pass, trigger_fail) {
					if(trigger_pass) {
						console.log('In route.js')
						console.log(trigger_pass)
						log(trigger_pass, CONSTANTS.logPath,"\r\n")
					}
					else {
						console.log(trigger_fail)
						log(trigger_fail, CONSTANTS.logPath,"\r\n")
					}
				})
			}
			else {
				console.log(fail)
				res.end(fail)
				log(fail, CONSTANTS.logPath,"\r\n")
			}
		})
	},
	
	getHotels: function(req, res) {
		console.log('get hotels')
		res.end('NodeJS works')
		log('NodeJS works', CONSTANTS.logPath,"\r\n")
	}
}
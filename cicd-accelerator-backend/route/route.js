var db = require('../db/db.js')
var core = require('../core/core.js')

module.exports = {

	checkUser: function(req, res) {		
		var username = (req.query.username)
		var password = (req.query.username)
		db.checkUser(username, password, function(pass, fail) {
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
	
	checkServerName: function(req, res) {
		var checkDuplicateServerName = (req.query.serverName)
		db.checkServerName(checkDuplicateServerName, function(pass, fail) {
			if(pass) {				
				console.log(typeof(pass))
				res.end(pass)
			}
			else {
				console.log(fail)
				res.end(fail)
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
			}
			else {
				console.log(fail)
				res.end(fail)
			}
		})
	},
	
	getBuildServers: function(req, res) {
		db.getBuildServers(function(pass, fail) {
			if(pass) {
				//console.log(JSON.stringify(pass))
				res.end(JSON.stringify(pass))
			}
			else {
				console.log(fail)
				res.end(fail)
			}			
		})
	},

	getPipelines: function(req, res) {
		db.getPipelines(function(pass, fail) {
			if(pass) {
				//console.log(JSON.stringify(pass))
				res.end(JSON.stringify(pass))
			}
			else {
				console.log(fail)
				res.end(fail)
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
					}
					else {
						console.log(log_fail)
					}
				})
			}
			else {
				console.log(fail)
				res.end(fail)
			}
		})
	},
	

	deleteBuildServer: function(req, res) {
		var buildServerName = req.params.name
		db.deleteBuildServer(buildServerName, function(pass, fail) {
			if(pass) {
				//console.log(JSON.stringify(pass))
				res.end((pass))
			}
			else {
				console.log(fail)
				res.end(fail)
			}			
		})
	},
	deletePipeline: function(req, res) {
		var pipelineName = req.params.name
		console.log('In deletePipeline method')
		db.getPipelineInfo(pipelineName, function(info_pass, info_fail) {
			if(info_pass) {
				core.deletePipeline(info_pass, function(del_pass, del_fail){
					if(del_pass){
						db.deletePipeline(pipelineName, function(pass, fail) {
							if(pass) {				
								res.end((pass))
							}
							else {
								console.log(fail)
								res.end(fail)
							}			
						})				
					}
					else {
						console.log(del_fail)
						res.end(del_fail)
					}
				})				
			}
			else {
				console.log(info_fail)
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
					}
					else {
						console.log(trigger_fail)
						res.end(trigger_fail)
					}
				})
			}
			else {
				console.log(fail) 
				res.end(fail)
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
					}
					else {
						console.log(trigger_fail)
					}
				})
			}
			else {
				console.log(fail)
				res.end(fail)
			}
		})
	},
	
	getHotels: function(req, res) {
		console.log('get hotels')
	}
}
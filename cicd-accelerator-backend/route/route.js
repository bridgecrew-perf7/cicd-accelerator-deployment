var db = require('../db/db.js')

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
	
	addPipelineDetails: function(req, res) {
		var pipelineInputs = (req.body)
		var pipelineName = pipelineInputs.data.pipelineName
		var buildServerName = pipelineInputs.data.buildServerName
		//console.log(pipelineInputs)
		db.addPipelineDetails(pipelineName, buildServerName, pipelineInputs, function(pass, fail) {
			if(pass) {
				var out = pipelineName+" has been inserted into the db"
				res.end(out)
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
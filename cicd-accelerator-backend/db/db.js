var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'admin@123',
  database : 'cicd_accelerator'
});

module.exports = {
	
	checkUser: function(username, password, callback) {
		var buff = new Buffer.from(password)
		var encryptedPassword = buff.toString('base64');
		connection.query('select * from userAuthorization where username = "'+username+'" and password = "'+encryptedPassword+'"', function(err, stdout) {
			if(err) {
				console.log(err)
			}
			else {
				if(stdout.length == 1) {					
					//console.log('In db.js')
					callback("Authorized", null)
				}
				else {
					callback(null, "Unauthorized")
				}
			}
		})
		
	},
	addBuildServer:  function(username, password, serverName, serverURL, callback) {
		connection.query('insert into buildServer(username, password, serverName, serverURL) values ("'+username+'", "'+password+'", "'+serverName+'", "'+serverURL+'")', function(err, stdout) {
			if(err) {
				console.log(err)
				callback(null, err)
			}
			else {
				console.log('Inserted into the table')
				var out = serverName + " has been inserted into the table"
				callback(out, null)
				
			}
		})
	},
	checkServerName: function(checkDuplicateServerName, callback) {
		connection.query('select count(*) as count from  buildServer where serverName = "'+checkDuplicateServerName+'"', function(err, stdout) {
			if(err) {
				console.log(err)
				callback(null, err)
			}
			else {
  				if(stdout[0].count > 0) {
					var out = "ServerName "+checkDuplicateServerName+" already existing";
					callback("Exist", null)
				}
				else {
					var out = "ServerName "+checkDuplicateServerName+" does not exist"
					callback("Don't Exist", null)
				}
			}
		})
	},
	
	getBuildServers: function(callback) {
		var servers = []
		var obj = {}
		connection.query('select * from buildServer', function(err, stdout) {
			if(err) {
				console.log(err)
				callback(err, null)
			}
			else {
				//console.log(stdout)
 				for(var i=0;i<stdout.length;i++) {								
					obj = {
						"name": stdout[i].serverName,
						"key": stdout[i].SNo
					}
					servers.push(obj)
				}
				console.log(servers)
				callback((servers), null)
			}
		})
	},
	addPipelineDetails: function(pipelineName, buildServerName, pipelineInputs, callback) {
		console.log((pipelineInputs.data.pipelineInputs))
 		connection.query("insert into pipelineDetails (buildServer, pipelineName, pipelineInputs) values ('"+buildServerName+"', '"+pipelineName+"', '"+JSON.stringify(pipelineInputs.data.pipelineInputs)+"')", function(err, stdout) {
			if(err) {
				console.log(err)
				callback(null, err)
			}
			else {
				console.log(pipelineName+" has been inserted into pipelineDetails")
				callback("Inserted", null)
			}
		})
	},
	getPipelines: function(callback) {
		var pipelines = []
		var obj = {}
		connection.query('select * from pipelineDetails', function(err, stdout) {
			if(err) {
				console.log(err)
				callback(err, null)
			}
			else {
				console.log(stdout)
 				for(var i=0;i<stdout.length;i++) {								
					obj = {
						"serverName": stdout[i].buildServer,
						"pipelineName": stdout[i].pipelineName,
						"id": stdout[i].SNo
					}
					pipelines.push(obj)
				}
				console.log(pipelines)
				callback((pipelines), null)
			}
		})		
	}
	
}
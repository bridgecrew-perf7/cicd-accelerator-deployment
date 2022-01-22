var congfigjson = require('./configjson.js')

var axios = require('axios')

var json2xml = require('json2xml');

var xml2js = require('xml2js');

var fs = require('fs')

var js2xmlparser = require("js2xmlparser");

var jenkinsapi = require('jenkins-api');

const log = require('log-to-file');

module.exports = {

	addPipelineDetails: function(serverInputs, values, callback) {
 		console.log('In core.js')
		console.log(serverInputs)
		console.log((values.data))
 		var url = 'http://'+serverInputs.buildServerUsername+':'+encodeURI(serverInputs.buildServerPassword)+'@'+serverInputs.buildServerURL
		console.log(url)
		var jenkins = require('jenkins')({ baseUrl: url, crumbIssuer: true });						  
        //values.pipelineInputs.repoInputs.fileName = "sparkjava-hello-world"
		var command = "curl -v -u "+values.data.pipelineInputs.repoInputs.repoUsername+':'+values.data.pipelineInputs.repoInputs.repoPassword+' --upload-file target/'+values.data.pipelineInputs.repoInputs.fileName+'.'+values.data.pipelineInputs.repoInputs.packagingFormat+' '+values.data.pipelineInputs.repoInputs.repoURL+'/'+values.data.pipelineInputs.repoInputs.groupId+'/'+values.data.pipelineInputs.repoInputs.artifactId+'/'+values.data.pipelineInputs.repoInputs.version+'/'+values.data.pipelineInputs.repoInputs.artifactId+'-'+values.data.pipelineInputs.repoInputs.version+'.'+values.data.pipelineInputs.repoInputs.packagingFormat		  
		console.log(command);
		congfigjson.json.scm.userRemoteConfigs["hudson.plugins.git.UserRemoteConfig"].url = values.data.pipelineInputs.scm.scmURL
		congfigjson.json.scm.userRemoteConfigs["hudson.plugins.git.UserRemoteConfig"].credentialsId = 'git_creds'  		
		congfigjson.json.builders["hudson.tasks.Shell"].command = command	
		//"sonar:sonar -Dsonar.projectKey=tomcat-application -Dsonar.host.url=http://172.18.0.3:9000 -Dsonar.login=2f8c3f01cbd92f74632c06a83308ce83221ade75"
		var sonarcmd = "sonar:sonar -Dsonar.projectKey="+values.data.pipelineInputs.sonarqube.sonarKey+" -Dsonar.host.url="+values.data.pipelineInputs.sonarqube.sonarURL+" -Dsonar.login="+values.data.pipelineInputs.sonarqube.sonarLogin+""
		congfigjson.json.builders["hudson.tasks.Maven"][1].targets = sonarcmd
		var xml = js2xmlparser.parse("project", congfigjson.json)
		var pipelineName = values.data.pipelineName	
        	jenkins.job.create(pipelineName, xml, function(err) {
			if(err) {
				console.log(err)
				log(err, "./logs/cicd-logs.log",'\r\n')
			}
			else {
				console.log('Job created')
				var op = pipelineName + " Job has been created"
				log(op, "./logs/cicd-logs.log",'\r\n')
				callback('IComeFromCallback.js', null)				
			}
		})
		

		
	},
	triggerPipeline: function(values, callback) {
		var url = 'http://'+values.buildServerUsername+':'+encodeURI(values.buildServerPassword)+'@'+values.buildSeverURL			
		var jenkins = require('jenkins')({ baseUrl: url, crumbIssuer: true });	
		var pipelineName = values.pipelineName
		jenkins.job.build(pipelineName, function(build_err, build_data) {
			  if (build_err) throw build_err;
				 log(build_err, "./logs/cicd-logs.log",'\r\n')
			  console.log('queue item number', build_data);
			  var op = pipelineName + " pipeline has been triggered"
			  log(op, "./logs/cicd-logs.log",'\r\n')
			  
		});		

	},
	getPipelineLogs: function(values, callback) {
		var url = 'http://'+values.buildServerUsername+':'+encodeURI(values.buildServerPassword)+'@'+values.buildSeverURL			
		var jenkins = require('jenkins')({ baseUrl: url, crumbIssuer: true });	
		var pipelineName = values.pipelineName
		console.log(pipelineName)
		jenkins.job.get(pipelineName, function(get_err, get_data) {
			if(get_err) {
				console.log(get_err)
				log(get_err, "./logs/cicd-logs.log",'\r\n')
			}
			else {
				var latestBuild = get_data.builds.length
 				jenkins.build.log(pipelineName,latestBuild, function(log_err, log_data) {
					  if (log_err) throw callback(null, log_err); log(log_err, "./logs/cicd-logs.log",'\r\n');
						 
					  //console.log('Log_data', log_data);
					  var obj = [{
						  'log_data': log_data,
						  'latestBuild': latestBuild
					  }]
					  //console.log('obj', obj)
					  log(obj, "./logs/cicd-logs.log",'\r\n')
					  callback(obj, null)
				});					
			}
		})
	},


	deletePipeline: function(serverInputs, callback) {
		console.log('In core.js')
		console.log('In deletePipeline method')
		console.log(serverInputs)
		var url = 'http://'+serverInputs.buildServerUsername+':'+encodeURI(serverInputs.buildServerPassword)+'@'+serverInputs.buildServerURL
		console.log(url)
		var jenkins = require('jenkins')({ baseUrl: url, crumbIssuer: true });						  
		var pipelineName= serverInputs.pipelineName
		jenkins.job.destroy(pipelineName, function(err) {
			if(err) {
				console.log(err);
				log(err, "./logs/cicd-logs.log",'\r\n')
				callback(null, err)
			}
			else {
				console.log('Job has been deleted successfully')
				log(pipelineName+" Job has been deleted successfully", "./logs/cicd-logs.log",'\r\n')
				callback('Job Deleted', null)
			}
		})

	}

}	 
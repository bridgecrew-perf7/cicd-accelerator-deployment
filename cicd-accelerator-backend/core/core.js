var congfigjson = require('./configjson.js')

var axios = require('axios')

var json2xml = require('json2xml');

var xml2js = require('xml2js');

var fs = require('fs')

var js2xmlparser = require("js2xmlparser");

var jenkinsapi = require('jenkins-api');

module.exports = {

	addPipelineDetails: function(serverInputs, values, callback) {
 		console.log('In core.js')
		console.log(serverInputs)
		console.log((values.data))
 		var url = 'http://'+serverInputs.buildServerUsername+':'+encodeURI(serverInputs.buildServerPassword)+'@'+serverInputs.buildServerURL
		console.log(url)
		var jenkins = require('jenkins')({ baseUrl: url, crumbIssuer: true });						  
        //values.pipelineInputs.repoInputs.fileName = "sparkjava-hello-world"
		var command = "curl -v -u "+values.data.pipelineInputs.repoInputs.repoUsername+':'+values.data.pipelineInputs.repoInputs.repoPassword+' --upload-file target/'+values.data.pipelineInputs.repoInputs.fileName+'.'+values.data.pipelineInputs.repoInputs.packagingFormat+' '+values.data.pipelineInputs.repoInputs.repoURL+'/'+values.data.pipelineInputs.repoInputs.groupId+'/'+values.data.pipelineInputs.repoInputs.artifactId+'/'+values.data.pipelineInputs.repoInputs.version+'/'+values.data.pipelineInputs.repoInputs.fileName+'-'+values.data.pipelineInputs.repoInputs.version+'.'+values.data.pipelineInputs.repoInputs.packagingFormat		  
		congfigjson.json.scm.userRemoteConfigs["hudson.plugins.git.UserRemoteConfig"].url = values.data.pipelineInputs.scm.scmURL
		congfigjson.json.scm.userRemoteConfigs["hudson.plugins.git.UserRemoteConfig"].credentialsId = 'git_creds'  		
		congfigjson.json.builders["hudson.tasks.Shell"].command = command				
		var xml = js2xmlparser.parse("project", congfigjson.json)
		var pipelineName = values.data.pipelineName	
       	jenkins.job.create(pipelineName, xml, function(err) {
			if(err) {
				console.log(err)
			}
			else {
				console.log('Job created')				
				callback('IComeFromCallback.js', null)				
			}
		})
		

		
	},
	triggerPipeline: function(values, callback) {
		var url = 'http://'+values.buildServerUsername+':'+(values.buildServerPassword)+'@'+values.buildSeverURL			
		var jenkins = require('jenkins')({ baseUrl: url, crumbIssuer: true });	

		jenkins.job.build(pipelineName, function(build_err, build_data) {
			  if (build_err) throw build_err;
				 
			  console.log('queue item number', build_data);
		});		

	}

}	 
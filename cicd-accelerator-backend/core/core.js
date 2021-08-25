var congfigjson = require('./configjson.js')

var axios = require('axios')

var json2xml = require('json2xml');

var xml2js = require('xml2js');

var fs = require('fs')

var js2xmlparser = require("js2xmlparser");

module.exports = {

	triggerPipeline: function(values, callback) {
		console.log('In core.js')
		console.log(values)
 		var url = 'http://'+values.buildServerUsername+':'+(values.buildServerPassword)+'@'+values.buildSeverURL			
		var jenkins = require('jenkins')({ baseUrl: url, crumbIssuer: true });						  
        values.pipelineInputs.repoInputs.fileName = "sparkjava-hello-world"
		var command = "curl -v -u "+values.pipelineInputs.repoInputs.repoUsername+':'+values.pipelineInputs.repoInputs.repoPassword+' --upload-file target/'+values.pipelineInputs.repoInputs.fileName+'.'+values.pipelineInputs.repoInputs.packagingFormat+' '+values.pipelineInputs.repoInputs.repoURL+'/'+values.pipelineInputs.repoInputs.groupId+'/'+values.pipelineInputs.repoInputs.artifactId+'/'+values.pipelineInputs.repoInputs.version+'/'+values.pipelineInputs.repoInputs.fileName+'-'+values.pipelineInputs.repoInputs.version+'.'+values.pipelineInputs.repoInputs.packagingFormat		  
		congfigjson.json.scm.userRemoteConfigs["hudson.plugins.git.UserRemoteConfig"].url = values.pipelineInputs.scm.scmURL
		congfigjson.json.scm.userRemoteConfigs["hudson.plugins.git.UserRemoteConfig"].credentialsId = 'git_creds'  		
		congfigjson.json.builders["hudson.tasks.Shell"].command = command				
		var xml = js2xmlparser.parse("project", congfigjson.json)
		var pipelineName = values.pipelineName
    	jenkins.job.create(pipelineName, xml, function(err) {
			if(err) {
				console.log('Caught err')
				console.log(err)
				callback(null, err)
			}
			else {
				console.log('Job created')
				callback('Triggered', null)
/* 				jenkins.job.build(pipelineName, function(build_err, build_data) {
				  if (build_err) throw build_err;
				 
				  console.log('queue item number', build_data);
				}); */
			}
		})
	}

}	 
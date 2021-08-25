var congfigjson = require('./configjson.js')

var axios = require('axios')

var json2xml = require('json2xml');

var xml2js = require('xml2js');

module.exports = {

	triggerPipeline: function(values, callback) {
		//console.log('In core.js')
 		var url = 'http://'+values.buildServerUsername+':'+(values.buildServerPassword)+'@'+values.buildSeverURL		
		console.log(url)
		var jenkins = require('jenkins')({ baseUrl: url, crumbIssuer: true });
		jenkins.job.list(function(err, data) {
		  if (err) throw err;
		 
		  console.log('jobs', data);
		});						  
        values.pipelineInputs.repoInputs.fileName = "sparkjava-hello-world"
		var command = "curl -v -u "+values.pipelineInputs.repoInputs.repoUsername+':'+values.pipelineInputs.repoInputs.repoPassword+' --upload-file target/.*'+values.pipelineInputs.repoInputs.packagingFormat+' '+values.pipelineInputs.repoInputs.repoURL+'/'+values.pipelineInputs.repoInputs.groupId+'/'+values.pipelineInputs.repoInputs.artifactId+'/'+values.pipelineInputs.repoInputs.version+'/'+values.pipelineInputs.repoInputs.fileName+'-'+values.pipelineInputs.repoInputs.version+'.'+values.pipelineInputs.repoInputs.packagingFormat		  
		congfigjson.json.scm.userRemoteConfigs["hudson.plugins.git.UserRemoteConfig"].url = values.pipelineInputs.scm.scmURL
		congfigjson.json.scm.userRemoteConfigs["hudson.plugins.git.UserRemoteConfig"].credentialsId = 'git_creds' 		
		congfigjson.json.builders["hudson.tasks.Shell"].command = command
		var proj = {
			"project": congfigjson.json
		}
		console.log(proj)
		var xml = json2xml(proj)
		console.log(xml)
/*  		jenkins.job.create('test1', xml, function(err) {
			if(err) {
				console.log(err)
			}
			else {
				console.log('Job created')
			}
		}) */
	}

}	 
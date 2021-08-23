module.exports = {

	triggerPipeline: function(values, callback) {
		//console.log('In core.js')
 		var url = 'http://'+values.buildServerUsername+':'+encodeURI(values.buildServerPassword)+'@'+values.buildSeverURL
		var jenkins = require('jenkins')({ baseUrl: url, crumbIssuer: true });
		jenkins.job.list(function(err, data) {
		  if (err) throw err;
		 
		  console.log('jobs', data);
		});
	}

}
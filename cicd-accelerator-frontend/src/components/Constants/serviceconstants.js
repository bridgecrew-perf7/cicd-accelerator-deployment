var constants = Object.freeze({

	logPath: "/var/log/cicd-logs/cicd-logs.log",
	//logPath: "./logs/cicd-logs.log",
	//BACKENDLOCALHOST: "cicd-backend-service.cicd-accelerator.svc.cluster.local",
	BACKENDLOCALHOST: "localhost",
	BACKENDPORT: 30023 

})

module.exports = constants;
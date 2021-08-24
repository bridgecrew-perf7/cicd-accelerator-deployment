module.exports = {

	json : {
   "actions": [],
   "description": [],
   "keepDependencies": "false",
   "properties": [],
   "scm": {
      "@plugin": "git@4.8.1",
      "configVersion": "2",
      "userRemoteConfigs": {
         "hudson.plugins.git.UserRemoteConfig": {
            "url": "https://github.com/SurenPonnusamy/sparkjava-war-example",
            "credentialsId": "git_creds"
         }
      },
      "branches": {
         "hudson.plugins.git.BranchSpec": {
            "name": "*/master"
         }
      },
      "doGenerateSubmoduleConfigurations": "false",
      "submoduleCfg": [],
      "extensions": []
   },
   "canRoam": "true",
   "disabled": "false",
   "blockBuildWhenDownstreamBuilding": "false",
   "blockBuildWhenUpstreamBuilding": "false",
   "triggers": [],
   "concurrentBuild": "false",
   "builders": {
      "hudson.tasks.Maven": [
         {
            "targets": "clean install",
            "usePrivateRepository": "false",
            "settings": [],
            "globalSettings": [],
            "injectBuildVariables": "false"
         },
         {
            "targets": "package",
            "usePrivateRepository": "false",
            "settings": [],
            "globalSettings": [],
            "injectBuildVariables": "false"
         }
      ],
      "hudson.tasks.Shell": {
         "command": "curl -v -u admin:admin@123 --upload-file target/sparkjava-hello-world-1.0.war http://localhost:8081/repository/java-repo/sparkjava-hello-world/sparkjava-hello-world/1.0.0/sparkjava-hello-world-1.0.0.war",
         "configuredLocalRules": []
      }
   },
   "publishers": [],
   "buildWrappers": {
      "hudson.plugins.ws__cleanup.PreBuildCleanup": {
         "@plugin": "ws-cleanup@0.39",
         "deleteDirs": "false",
         "cleanupParameter": [],
         "externalDelete": [],
         "disableDeferredWipeout": "false"
      }
   }
}
}

//curl -v -u admin:admin@123 --upload-file sparkjava-hello-world-1.0.war http://localhost:8081/repository/java-repo/sparkjava-hello-world/sparkjava-hello-world/1.0.2/sparkjava-hello-world-1.0.0.war

//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 git token

//11efea4c1c5d355b062e8d9a0938cdc3ec jenkins token


/* curl -X POST 'http://localhost:8080/credentials/store/system/domain/_/createCredentials' --data-urlencode 'json={
  "credentials": {
    "scope": "GLOBAL",
    "id": "apicredentials",
    "username": "apicredentials",
    "password": "P@$$W0rd",
    "description": "apicredentials",
    "stapler-class": "com.cloudbees.plugins.credentials.impl.UsernamePasswordCredentialsImpl"
  }
}' --user surendhar:11efea4c1c5d355b062e8d9a0938cdc3ec */
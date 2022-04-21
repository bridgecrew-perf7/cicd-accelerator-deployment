pipeline {
    agent any
    parameters {
        //string defaultValue: 'https://github.com/SurenPonnusamy/cicd-accelerator-deployment', name: 'git_url'
        string defaultValue: 'cicd-frontend', name: 'cicd_frontend_image_name'
        string defaultValue: '1.0.0', name: 'cicd_frontend_tag_name'
	string defaultValue: 'cicd-backend', name: 'cicd_backend_image_name'
        string defaultValue: '1.0.0', name: 'cicd_backend_tag_name'    
        string defaultValue: 'surendharselvakumar', name: 'docker_repo'
    }
    
    environment {
      maven = "/usr/bin/mvn"
    }
    

    stages {
        stage('Clean workspace') {
            steps {
                cleanWs()
            }
        }
        stage('GIT') {
            steps {
                git branch: 'dev', credentialsId: 'docker_creds', url: 'https://github.com/SurenPonnusamy/cicd-accelerator-deployment'   
            }
        }
        stage ('Docker Login') {
            steps {
                withDockerRegistry(credentialsId: 'docker_creds', url: 'https://index.docker.io/v1/') {
		    sh '''
		    	docker login 
		    '''
		}
            }
        }        
        stage ('Docker build Image for Frontend') {
            steps {
                withDockerRegistry(credentialsId: 'docker_creds', url: 'https://index.docker.io/v1/') {
		    sh '''
			cd $WORKSPACE/
			docker build -t ${cicd_frontend_image_name}:${cicd_frontend_tag_name} .
			docker tag ${cicd_frontend_image_name}:${cicd_frontend_tag_name} ${docker_repo}/${cicd_frontend_image_name}:${cicd_frontend_tag_name}
		    '''
		}
            }		
        }
        stage ('Docker Push Image for Frontend') {
            steps {
                sh '''
			cd $WORKSPACE/
			docker push ${docker_repo}/${cicd_frontend_image_name}:${cicd_frontend_tag_name}
		'''
            }
        }
        stage ('Docker build Image for Backend') {
            steps {
                withDockerRegistry(credentialsId: 'docker_creds', url: 'https://index.docker.io/v1/') {
		    sh '''
			cd $WORKSPACE/
			docker build -t ${cicd_backend_image_name}:${cicd_backend_tag_name} .
			docker tag ${cicd_backend_image_name}:${cicd_backend_tag_name} ${docker_repo}/${cicd_backend_image_name}:${cicd_backend_tag_name}
		    '''
		}
            }		
        }
        stage ('Docker Push Image') {
            steps {
                sh '''
			cd $WORKSPACE/
			docker push ${docker_repo}/${cicd_backend_image_name}:${cicd_backend_tag_name}
		'''
            }
        }	    
    }
}

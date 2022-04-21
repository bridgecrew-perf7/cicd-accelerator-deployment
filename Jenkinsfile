pipeline {
    agent any
    parameters {
        string defaultValue: 'https://github.com/SurenPonnusamy/cicd-accelerator-deployment', name: 'git_url'
        string defaultValue: '2.0', name: 'version'
        string defaultValue: 'alpine-cicd-image', name: 'image_name'
        string defaultValue: '1.0.0', name: 'tag_name'
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
                git params.git_url   
            }
        }
        stage ('Docker Login') {
            steps {
                sh '''
					cd $WORKSPACE/					
					docker login -u surendharselvakumar -p Suren2302%
				'''
            }
        }        
        stage ('Docker build Image') {
            steps {
                sh '''
					cd $WORKSPACE/
					docker build -t ${image_name}:${tag_name} .
					docker tag ${image_name}:${tag_name} ${docker_repo}/${image_name}:${tag_name}
				'''
            }
        }
        stage ('Docker Push Image') {
            steps {
                sh '''
					cd $WORKSPACE/
					docker push ${docker_repo}/${image_name}:${tag_name}
				'''
            }
        }
    }
}

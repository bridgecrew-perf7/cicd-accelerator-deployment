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
            when {
                expression { params.deploymentType == 'kubernetes' }
            }
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
	stage ('Replace tag in yaml file') {
	  steps {
		sh 'cd $WORKSPACE'
		sh 'sed -i "s/image-version/${image_name}/g" cicd-image.yml'
		sh 'sed -i "s/tag-version/${tag_name}/g" cicd-image.yml'
	  }
	}
	stage ('Deploy yaml in cluster') {
	  when {
	    expression { params.deploymentType == "kubernetes" }
	  }
	  steps {
	  	sh 'cd $WORKSPACE'
		sh 'cat cicd-image.yml'
		sh 'kubectl apply -f cicd-image.yml'
	  }
	 }
    }
}

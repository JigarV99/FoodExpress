pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        stage('Build') {
            steps {
                sh 'sudo python3 /home/ubuntu/deployScript.py'
            }
        }
        
        stage('QA') {
            steps {
                sh 'sudo python3 /home/ubuntu/deployQA.py'
            }
        }
        
    }
}

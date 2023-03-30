pipeline {
    agent any
    triggers {
        githubPush()
    }
    stages {
        
         stage('Test') {
            steps {
                echo 'Testing..'
            }
         }
             
        stage('Deploy Build') {
            steps {
                sh 'sudo python3 /home/ubuntu/deployScript.py'
            }
        }
        
        stage('Deploy QA') {
            steps {
                sh 'sudo python3 /home/ubuntu/deployQA.py'
            }
        }       
    }
}

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
    
    post {
      always {
        emailext body: 'Email Notification  for deployment', recipientProviders: [[$class: 'jigarvaishnav100@gmail.com']], subject: 'Test'
    }
  }
}

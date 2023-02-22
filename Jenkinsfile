pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                echo 'Building..'
                sh 'sudo python3 /home/ubuntu/deployScript.py'
            }
        }
    }
}

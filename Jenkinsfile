pipeline {
    agent any

    environment {
        NODEJS_VERSION = '18'  // Adjust to your project needs
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/SAHILSHANGLOO35/DevOps_BrainBucket.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'  // Installs project dependencies
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test'  // Run unit tests (Ensure test scripts are defined in package.json)
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    sh 'npm run build'  // Builds the MERN app (if applicable)
                }
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo 'Deploying application...'
                // Add deployment steps here if needed
            }
        }
    }

    post {
        success {
            echo 'Pipeline execution completed successfully.'
        }
        failure {
            echo 'Pipeline execution failed.'
        }
    }
}

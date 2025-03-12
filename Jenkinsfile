pipeline {
    agent any

    environment {
        GIT_REPO = 'https://github.com/SAHILSHANGLOO35/DevOps_BrainBucket.git'
        BRANCH = 'main'
    }

    stages {
        stage('Clone Repository') {
            steps {
                script {
                    echo 'Cloning Repository...'
                    git branch: "${BRANCH}", url: "${GIT_REPO}"
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing Dependencies...'
                    // Example for Node.js project
                    sh 'npm install'
                    
                    // Example for Python project
                    // sh 'pip install -r requirements.txt'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo 'Running Tests...'
                    // Example test command for Node.js
                    sh 'npm test'
                    
                    // Example test command for Python
                    // sh 'pytest'
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    echo 'Building Application...'
                    // Example for Node.js
                    sh 'npm run build'

                    // Example for Java (Maven)
                    // sh 'mvn clean package'

                    // Example for Python (if needed)
                    // sh 'python setup.py build'
                }
            }
        }

        stage('Deploy (Optional)') {
            steps {
                script {
                    echo 'Deploying Application...'
                    // Add deployment script here
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}

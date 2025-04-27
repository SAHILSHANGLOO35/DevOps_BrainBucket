pipeline {
    agent { label 'windows' }

    environment {
        IMAGE_NAME = 'brainbucket-backend'
        EC2_HOST   = 'ec2-15-206-163-27.ap-south-1.compute.amazonaws.com'
        EC2_USER   = 'ubuntu'
        SSH_KEY    = 'C:\\jenkins-agent\\.ssh\\brain-bucket.pem'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/SAHILSHANGLOO35/DevOps_BrainBucket.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('server') {
                    bat 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                dir('server') {
                    bat 'npm test'
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                dir('server') {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat """
                            docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                            docker build -t %DOCKER_USER%/%IMAGE_NAME%:latest .
                            docker push %DOCKER_USER%/%IMAGE_NAME%:latest
                        """
                    }
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    dir('server') {
                        script {
                            def img = "${DOCKER_USER}/${IMAGE_NAME}:latest"
                            def deployScript = """
                                #!/bin/bash
                                echo '${DOCKER_PASS}' | sudo docker login -u ${DOCKER_USER} --password-stdin
                                sudo docker pull ${img}
                                sudo docker stop brainbucket-backend || true
                                sudo docker rm brainbucket-backend || true
                                sudo docker run -d --name brainbucket-backend -p 8000:8000 ${img}
                            """

                            // Write deploy script to file
                            writeFile file: 'deploy-commands.sh', text: deployScript
                        }

                        // Fix SSH permissions on private key
                        bat """
                            icacls "${SSH_KEY}" /inheritance:r
                            icacls "${SSH_KEY}" /remove:g BUILTIN\\Users
                            icacls "${SSH_KEY}" /grant:r "%USERNAME%":F
                        """

                        // Copy deploy script to EC2
                        bat """
                            scp -o StrictHostKeyChecking=no -i "${SSH_KEY}" deploy-commands.sh ${EC2_USER}@${EC2_HOST}:/home/${EC2_USER}/deploy-commands.sh
                        """

                        // Execute deploy script on EC2
                        bat """
                            ssh -o StrictHostKeyChecking=no -i "${SSH_KEY}" ${EC2_USER}@${EC2_HOST} "chmod +x /home/${EC2_USER}/deploy-commands.sh && /home/${EC2_USER}/deploy-commands.sh"
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo '✅ Pipeline succeeded! App is deployed.'
        }
        failure {
            echo '❌ Pipeline failed! Check logs.'
        }
    }
}

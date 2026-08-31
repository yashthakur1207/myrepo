pipeline {
    agent any

    environment {
        IMAGE_NAME = 'devops-node-app'
        IMAGE_TAG = 'latest'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Test') {
            steps {
                bat 'npm ci'
                bat 'npm test'
            }
        }

        stage('Docker Network Test') {
            steps {
                bat 'docker context show'
                bat 'docker info'
                bat 'docker version'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKERHUB_USER',
                    passwordVariable: 'DOCKERHUB_TOKEN'
                )]) {
                    bat 'echo %DOCKERHUB_TOKEN%| docker login -u %DOCKERHUB_USER% --password-stdin'
                    bat 'docker tag %IMAGE_NAME%:%IMAGE_TAG% %DOCKERHUB_USER%/%IMAGE_NAME%:%IMAGE_TAG%'
                    bat 'docker push %DOCKERHUB_USER%/%IMAGE_NAME%:%IMAGE_TAG%'
                }
            }
        }
    }

    post {
        always {
            bat(script: 'docker logout', returnStatus: true)
        }
    }
}
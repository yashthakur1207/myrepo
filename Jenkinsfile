pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'rajveermistri/devops-node-app:latest'
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
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Push Docker Image') {
            steps {
                bat 'docker push %DOCKER_IMAGE%'
            }
        }
    }
}
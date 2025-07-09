pipeline {
  agent any

  environment {
    DOCKER_HUB_USER = 'samchandra1100' //  username docker 
    IMAGE_NAME = 'desi-naar-app' //docker hub image name
  }

  triggers {
    githubPush()
  }

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/chandraguptsharma1/desi_naar_app_deploy.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Angular App') {
      steps {
        sh 'npm run build --prod'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_HUB_USER/$IMAGE_NAME:latest .'
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([string(credentialsId: 'dockerhub-token', variable: 'DOCKER_TOKEN')]) {
          sh '''
            echo $DOCKER_TOKEN | docker login -u $DOCKER_HUB_USER --password-stdin
            docker push $DOCKER_HUB_USER/$IMAGE_NAME:latest
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          kubectl config use-context minikube
          kubectl apply -f deployment.yaml
          kubectl apply -f service.yaml
        '''
      }
    }
  }
}

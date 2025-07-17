pipeline {
  agent any

  environment {
    IMAGE_NAME = 'desi-naar-app'
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
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Run Docker Container') {
      steps {
        sh '''
          docker rm -f $IMAGE_NAME || true
          docker run -d --name $IMAGE_NAME -p 4200:80 $IMAGE_NAME
        '''
      }
    }
  }
}

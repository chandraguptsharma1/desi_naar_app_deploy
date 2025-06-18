pipeline {
  agent {
    docker {
      image 'node:18'    
    }
  }

  environment {
    IMAGE_NAME = 'desi_naar_app'
    CONTAINER_NAME = 'desi_naar_container'
  }

  triggers {
    githubPush()
  }

  stages {
    stage('Checkout Code') {
      steps {
        git 'https://github.com/chandraguptsharma1/desi_naar_app.git'
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
          docker rm -f $CONTAINER_NAME || true
          docker run -d -p 4200:80 --name $CONTAINER_NAME $IMAGE_NAME
        '''
      }
    }
  }
}

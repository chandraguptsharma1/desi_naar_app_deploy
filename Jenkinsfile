pipeline {
  agent any

  environment {
    APP_NAME = 'desi-naar-app'
    TIMESTAMP = "${new Date().format('yyyyMMdd-HHmmss')}"
    IMAGE_TAG = "${APP_NAME}:build-${BUILD_NUMBER}-${TIMESTAMP}" //image tag to identify
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
        sh """
          docker build -t $APP_NAME:latest -t $IMAGE_TAG .
        """
      }
    }

    stage('Cleanup Old Docker Images (Keep Last 5)') {
      steps {
        sh """
          echo "Cleaning old Docker images..."
          IMAGE_IDS=\$(docker images --format '{{.Repository}}:{{.Tag}} {{.ID}}' | grep '^$APP_NAME:build-' | sort -r | awk 'NR>5 {print \$2}')
          for id in \$IMAGE_IDS; do
            echo "Removing image \$id"
            docker rmi -f \$id || true
          done
        """
      }
    }

    stage('Run Docker Container') {
      steps {
        sh """
          docker rm -f $APP_NAME || true
          docker run -d --name $APP_NAME -p 4200:80 $APP_NAME:latest
        """
      }
    }
  }
}

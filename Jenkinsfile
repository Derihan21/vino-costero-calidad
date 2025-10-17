pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'mvn -f backend/pom.xml clean package -DskipTests'
        sh 'npm --prefix frontend install'
        sh 'npm --prefix frontend run build'
      }
    }
    stage('Docker Build') {
      steps {
        sh 'docker compose build'
      }
    }
  }
}

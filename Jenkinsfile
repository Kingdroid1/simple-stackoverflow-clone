#!/
pipeline {
  agent any
  
  environment {
        JWT_SECRET = 'RFSVRTVRSDeEFEW'
        SESSION_SECRET = 'justSome1890Secret'
        GOOGLE_CLIENT_ID = '963365398185-4q74g4gc1e5e89idkr18ikdb8hmbd1s8.apps.googleusercontent.com'
        GOOGLE_CLIENT_SECRET = '51-HfrcQfeBkl93pxyCDlp2H'
        GITHUB_CLIENT_ID = 'a24dc288361ede4b300d'
        GITHUB_CLIENT_SECRET = '448d92399623216b7cb1be71648969dbece7288d'
        PORT = 59999
    }
  stages {
    stage('build') {
      steps {
        sh 'npm --version'
        sh 'npm install'
        sh 'npm build'
        echo 'Building ...'
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
        echo 'Testing ...'
      }
    }
  }
}
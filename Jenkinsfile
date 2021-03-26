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
    stage('preflight') {
      steps {
        echo sh(returnStdout: true, script: 'env')
        sh 'node -v'
      }
    }
    stage('build') {
      steps {
        sh 'npm --version'
        sh 'git log --reverse -1'
        sh 'npm install'
        sh 'npm start'
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
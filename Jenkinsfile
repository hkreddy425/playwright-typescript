pipeline {

    agent any

    tools {

        nodejs 'NodeJS_20'
    }

    stages {

        stage('Install Dependencies') {

            steps {

                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {

            steps {

                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {

            steps {

                bat 'npx playwright test'
            }
        }
    }

    post {

    always {

        allure(

            commandline: 'Allure',

            includeProperties: false,

            jdk: '',

            results: [[path: 'allure-results']]
        )
    }
}
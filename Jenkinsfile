#!groovy
node {
    def nodeHome = tool name: '8.3.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

    def dockerHub = 'https://registry.hub.docker.com'
    def dockerHubCreds = 'docker-hub-login'
    def dockerRepo = 'magneticio'
    def dockerImageName = 'simpleservice'
    def vampDeploymentName = 'simpleservice'
    def vampHost = 'http://10.0.1.134:3232'

    def dockerImage

    currentBuild.result = "SUCCESS"

    try {
        stage('Checkout'){
            checkout scm
            sh 'git rev-parse HEAD > commit'
        }
        stage('Install') {
            sh 'npm install'
        }
        stage('Test') {
            sh 'npm test'
        }
        stage('Build Docker image') {
            dockerImage = docker.build("${dockerRepo}/${dockerImageName}")
        }
        stage('Push Docker image') {
            def commit = readFile('commit').trim().take(6)
            docker.withRegistry(dockerHub, dockerHubCreds) {
                dockerImage.push(commit)
                dockerImage.push("latest")
            }
        }
        stage('Deploy') {
            sh "curl -X POST --data-binary @vamp_blueprint.yml ${vampHost}/api/v1/blueprints -H 'Content-Type: application/x-yaml'"
            sh "curl -X PUT --data-binary @vamp_blueprint.yml ${vampHost}/api/v1/deployments/${vampDeploymentName} -H 'Content-Type: application/x-yaml'"
        }
        stage('Cleanup') {
            sh 'rm node_modules -rf'
        }
    }
    catch (err) {
        currentBuild.result = "FAILURE"
        throw err
    }
}
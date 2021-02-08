node {    
    def app     
    stage('Clone repository') {               
        checkout scm    
    }     
    stage('Build image') {         
        app = docker.build("jinjustin/omega_web")    
    }          
    stage('Push image') {          
    app.push("${env.BUILD_NUMBER}")            
    app.push("latest")          
    }
    
}
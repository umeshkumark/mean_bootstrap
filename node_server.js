/* 
 * file - node_server.js 
 * desc - Reads the config.json file & starts the node server on the port mentioned in the 
 * config.json file 
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

// Initialize Express
var express = require('express');
var app = express();

// Read the config.json file
var fs = require('fs');
var configJSONFile = './config.json';

fs.readFile(configJSONFile, 'utf8', function (error, data) {
    console.log('Reading config file....');
    var configData = null;
    if (error) {
        console.log('Error while reading config file :' + error);
        return;
    }
    configData = JSON.parse(data);
    console.dir(configData);
    startServer(configData);
    
});

function startServer(configData){
    if(configData !== null){
    console.log('starting node server....');
    var currentDir = __dirname;
    console.log('Current Directory - ' + currentDir);
    app.configure(function() {
        var staticDataDir = currentDir+configData.clientDirectory;
        var indexHtmlFile = currentDir+configData.homeScreen;
        var staticHttpPort = configData.httpPort;
        var environment = configData.environment;
        var dbConnURI = null;
        if(environment == 'dev' ){
            dbConnURI = configData.devDBConnURI;
        }
        else if (environment == 'prod'){
            dbConnURI = configData.devDBConnURI;
        }
        else if (environment == 'qa'){
            dbConnURI = configData.qaDBConnURI;
        }
        
        // For OPEN SHIFT & HEROKU deployments read the port from environment variables
        var host = configData.host;
        var httpPort = '';
        var ip = '';
        if(host == 'openshift') {
            console.log('openshift deployment');
            httpPort = process.env.OPENSHIFT_NODEJS_PORT || staticHttpPort; 
            ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
        }
        else if (host == 'heroku') {
            console.log('heroku deployment');
            httpPort = process.env.PORT || staticHttpPort;
            ip = process.env.IP;
        }
        else {
            // Default
            console.log('local deployment');
            httpPort = staticHttpPort;
            ip = '127.0.0.1';
            
        }
        
        console.log('Environment - ' + environment);
        console.log('Static Data Directory - ' + staticDataDir);
        console.log('Index HTML file - ' + indexHtmlFile);
        console.log('HTTP Port - ' + httpPort);
        console.log('IP - ' + ip);
        console.log('MongoDB Connection URI - ' + dbConnURI);
	
        app.use(express.static(staticDataDir));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
        
        // default route. When user hits F5/reload send the index.html file
	app.use(function(request, response) {
            response.sendfile(indexHtmlFile);
        });
        
        // Load the Default Route.js file
        var routes = require('./node/routes/Main_Routes.js')(app,currentDir,dbConnURI);
        
        // start server
        app.listen(httpPort,ip);
        exports = module.exports = app;
        
    });
    } else {
        console.log('could not read config data....');  
    }
}




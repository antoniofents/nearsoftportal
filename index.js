/*
Load Twilio configuration from .env config file - the following environment
variables should be set:
process.env.TWILIO_ACCOUNT_SID
process.env.TWILIO_API_KEY
process.env.TWILIO_API_SECRET
process.env.TWILIO_CONFIGURATION_SID
*/
require('dotenv').load();
var http = require('http');
var path = require('path');
var AccessToken = require('twilio').jwt.AccessToken;;
var VideoGrant = AccessToken.VideoGrant;
var express = require('express');
var bodyParser = require('body-parser')

// Create Express webapp
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var usersAdmited=['CUU', 'HMO', 'CDMX', 'VISIT' ];
var usersConected=[];
var participants={};

/*
Generate an Access Token 
*/
app.get('/token', function(request, response) {

   
    if(request.query.id==null || usersAdmited.indexOf(request.query.id)==-1 || usersConected.indexOf(request.query.id)!=-1){
         console.log('rejected connection');
         console.log(request.query.id);
         console.log('**');
         console.log(usersConected);
         console.log('please try again later');
        response.send({
            redirect: "/wait.html"
        });
    }else{
        console.log('connection accepted');
        usersConected.push(request.query.id);
        console.log(usersConected);
    
        var identity =request.query.id;

        const room = request.query.room;
        
        const token = new AccessToken(
            process.env.TWILIO_ACCOUNT_SID,
            process.env.TWILIO_API_KEY,
            process.env.TWILIO_API_SECRET
        );

         token.identity = identity;

          // Grant the access token Twilio Video capabilities
          const grant = new VideoGrant();
          grant.room = room;
          token.addGrant(grant);

         response.send({
            identity: identity,
            token: token.toJwt()
        });

    }
});

app.get('/restore', function(request,res){
    console.log("removing all users ");
    usersConected= [];
    participants={};
    res.redirect("wait.html")
    return;
});


app.post('/refreshUsers', function(request,res){
    console.log("removing:"+request.body.participant);
    var index = usersConected.indexOf(request.body.participant);   
    if (index > -1) {
        usersConected.splice(index, 1);
    }
});


// Create http server and run it
var server = http.createServer(app);

var port = process.env.PORT || 443 ;
server.listen(port, "0.0.0.0", function() {
    console.log('Express server running on 0.0.0.0:' + port);
});

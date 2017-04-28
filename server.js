/**
 * Created by JOSEVALDERLEI on 25/06/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config.server');
var mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var dpi = require('./service/edit.problem.io');


var connectWithRetry = function() {
mongoose.connect(config.database.uri, function(err){
    if(err){
        console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
        setTimeout(connectWithRetry, 5000);
    } else {
        console.log('Connected to the database');
    }
});
};

connectWithRetry();


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + config.clientPath));

/*
var api = require('./service/routes/api')(app,express);
app.use('/api',api);
*/

var api = require('./service/routers/routersAPI')(app,express);
app.use('/api', api);


app.get("*", function(req,res){
    res.sendFile(__dirname + config.viewPath);
});

io.on('connection', function(socket) {
    dpi(io, socket);
});


http.listen(config.port, function(err){
    if(err){
        console.log(err);
    }else{
        console.log("Listening on port " + config.port);
    }
});
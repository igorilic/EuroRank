var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost:27017/teamApi');
var Team = require('./models/team');
var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var teamRouter = require('./routes/teamRoutes')(Team);
// API


app.use('/api', teamRouter);

app.listen(port, function() {
    console.log('Server is up and running at port ' + port);
});
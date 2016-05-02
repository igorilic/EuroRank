var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
//CORS middleware, required for cross origin server request
app.use(cors());
var db = mongoose.connect('mongodb://eurorank:sarma123@ds011422.mlab.com:11422/eurorank');
var Team = require('./models/team');


var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var teamRouter = require('./routes/teamRoutes')(Team);
// API


app.use('/api', teamRouter);

app.listen(port, function() {
    console.log('Server is up and running at port ' + port);
});
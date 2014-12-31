var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var RoutePlanner = require('./server/RoutePlanner.js');

var port = process.env.PORT || 6007;

//initialize app and use cors & body parser
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/createRoute', function(req, res){
  console.log(req.body.coordinates);
  var route = new RoutePlanner(req.body.coordinates, true);
  res.status(200).send(route.findRoute());
});

app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function(){
  console.log('Server is listening on port ' + port);
});

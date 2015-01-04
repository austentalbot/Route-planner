var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var RoutePlanner = require('./server/RoutePlanner.js');
var PathSimilarity = require('./server/PathSimilarity.js');

var port = process.env.PORT || 6007;

//initialize app and use cors & body parser
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/generateRoute', function(req, res){
  console.log(req.body.coordinates);
  var route = new RoutePlanner(req.body.coordinates, true);
  res.status(200).send(route.findRoute());
});

app.post('/calculateSimilarity', function(req, res){
  console.log(req.body.coordinates);
  var similarities = new PathSimilarity(req.body.coordinates);
  res.status(200).send(similarities.createSimilarityMatrix());
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

var server = app.listen(port, function(){
  console.log('Server is listening on port ' + port);
});

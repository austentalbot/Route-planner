var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var port = process.env.PORT || 6007;

//initialize app and use cors & body parser
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function(req, res){
  console.log('index');
  console.log(__dirname);
  res.status(200).sendFile(__dirname + '/index.html');
});

app.get('/build/:file', function(req, res){
  console.log('bundle');
  var file = req.params.file;
  res.status(200).sendFile(__dirname + '/build/' + file);
});

app.post('*', function(req, res){
  console.log(req.body);
  res.status(200).send('success');
});

var server = app.listen(port, function(){
  console.log('Server is listening on port ' + port);
});

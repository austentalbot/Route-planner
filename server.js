var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var port = process.env.PORT || 6007;

//initialize app and use cors & body parser
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('*', function(req, res){
  console.log(req.body);
  res.status(200).send('success');
});

app.use(express.static(__dirname + '/public'));

var server = app.listen(port, function(){
  console.log('Server is listening on port ' + port);
});

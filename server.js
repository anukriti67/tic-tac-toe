var express = require('express');
var app = express();
var port = 8011;
var rtr = require("./registration");
app.use('/',rtr);
app.use(express.static(__dirname+'/public'))
app.listen(port,function(){
  console.log("Server started");
});


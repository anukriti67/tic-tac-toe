var express = require('express');
var app = express();
var port = 8011;
var rtr = require("./routes");
app.use('/',rtr);
console.log(__dirname+'/public' + 'here');
app.use(express.static(__dirname+'\\public'))
app.listen(port,function(){
  console.log("Server started");
});


var exp = require('express');
var router = exp.Router();
var path = require('path')
let bodyParser = require('body-parser');
let db = require('./db')
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/registration',function(req,resp){
if(db.Validate({
    "name": req.body.firstName,
    "id":req.body.userid,
    "password" :req.body.pwd
  }))
console.log('user already exists');
else
console.log('doesnt');
 });
router.get('/',function(req,resp){
  resp.sendFile(__dirname + "/registration.html");
})

module.exports= router
var exp = require('express');
var router = exp.Router();
var path = require('path')
router.get('/game',function(req,resp){
  resp.sendFile(path.join(__dirname,'./public/registration.html'))
})

router.get('/intro',function(req,resp){
resp.send("intro begins");
})

router.get('/contact');
router.post('/contact')

module.exports = router
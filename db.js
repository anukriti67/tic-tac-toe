function dataBase() {
    this.url = 'mongodb://localhost:3099';
}


dataBase.prototype.Insert = function(udata) {
    let fn = function(dbobj) {
        dbobj.collection('users').insertOne(udata, function(err, res) {
            if (err != null)
                console.log('error inserting into the database');
            else
                console.log('inserted into db ' + res);
        });
        dbobj.close();
        console.log('databse is closed');
    }
    this.ConnectToDb(udata, fn)
}

dataBase.prototype.Validate =function(udata){
let fn = function(dbobj){
let cursor = dbobj.collection('users').findOne({id:udata.id},function(err,res){

if(res.password==udata.password)
{
  console.log('valid user');

}
else
console.log('invalid user');
console.log(res.password);
})

}
this.ConnectToDb(udata,fn);

}

dataBase.prototype.Find = function(uid) {
    let fn = function(dbobj) {
        let val = false;
        let cursor = dbobj.collection('users').find({'id':uid}).toArray(function(err,results){
        
          if(results.length>0)
            return true;
          else
            return false;

        });
       }
     this.ConnectToDb(uid, fn);

}



dataBase.prototype.ConnectToDb = function(data, callback) {
    let mongo = require('mongodb').MongoClient;
    mongo.connect(this.url, (err, dbobj) => {
        if (err) {
            console.log("db not conntected");
            return false;
        }
        else{
            let v = callback(dbobj);
           return v;}
    });
}




module.exports = new dataBase()
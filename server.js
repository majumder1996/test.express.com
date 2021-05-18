const Express = require("express");
var MongoClient = require('mongodb').MongoClient;
const fs = require("fs");
var BodyParser = require('body-parser');

const server = Express();
var connectionString = "mongodb://192.168.226.137:27017/expressDB"
var logData = "";
var clientDB;

server.use(BodyParser.urlencoded({extended:true}));
server.use(BodyParser.json());

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
  }, (err, client) => {
    if (err) { 
        return console.error(err);
    }
    else {
        let current = new Date();
        clientDB = client;
        logData = "[ "+current.toLocaleString()+" "+current.getTimezoneOffset()+" ] App got connected to Database "+connectionString+" \n";
        fs.appendFile('./logs/APILogs.log',logData, (err) => {
            if(err) throw err;
        });
        console.log(logData);
    }
  })

const PORT = 3001;




server.get('/', (req,res) => {
    res.send("You have hitted a GET API on port: "+PORT);
    let current = new Date();
    logData = "[ "+current.toLocaleString()+" "+current.getTimezoneOffset()+" ] Someone hits the GET API \n";
    fs.appendFile('./logs/APILogs.log',logData, (err) => {
        if(err) throw err;
    });
    console.log(logData);
});
server.post('/', (req,res) => {
    console.log(req.body);
    clientDB.collection('employees').insert(req.body, function (err, result) {
        if (err)
           res.send('Error');
        else
          res.send('Success');
  
    });
    res.send("Requested body received");
});

server.put('/', (req,res) => {
    res.send("You have hitted PUT API on port: "+PORT);
    let current = new Date();
    logData = "[ "+current.toLocaleString()+" "+current.getTimezoneOffset()+" ] Someone hits the PUT API \n";
    fs.appendFile('./logs/APILogs.log',logData, (err) => {
        if(err) throw err;
    });
    console.log(logData);
});

server.delete('/', (req,res) => {
    res.send("You have hitted DELETE API on port: "+PORT);
    let current = new Date();
    logData = "[ "+current.toLocaleString()+" "+current.getTimezoneOffset()+" ] Warning! Someone hits the DELETE API \n";
    fs.appendFile('./logs/APILogs.log',logData, (err) => {
        if(err) throw err;
    });
    console.log(logData);
});


server.listen(PORT, () => {
    let current = new Date();
    logData = "[ "+current.toLocaleString()+" "+current.getTimezoneOffset()+" ] Application started and answering to port: "+PORT+" \n";
    fs.appendFile('./logs/APILogs.log',logData, (err) => {
        if(err) throw err;
    });
    console.log(logData);
});
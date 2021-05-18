const Express = require("express");
const fs = require("fs");

const server = Express();

const PORT = 3001;
var logData = "";


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
    res.send("You have hitted POST API on port: "+PORT);
    let current = new Date();
    logData = "[ "+current.toLocaleString()+" "+current.getTimezoneOffset()+" ] Someone hits the POST API \n";
    fs.appendFile('./logs/APILogs.log',logData, (err) => {
        if(err) throw err;
    });
    console.log(logData);
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
    console.log("App is now answering to port: "+PORT);
});
const Express = require("express");
//var MongoClient = require('mongodb').MongoClient;
var Mongoose = require('mongoose');
var ProdModel = require("./Schemas/productSchema");
const fs = require("fs");
var BodyParser = require('body-parser');

const server = Express();
var connectionString = "mongodb://192.168.226.137:27017/expressDB"
var logData = "";
var clientDB;

server.use(BodyParser.urlencoded({extended:true}));
server.use(BodyParser.json());
// database connectivity with Mongodb client
// MongoClient.connect(connectionString, {
//     useUnifiedTopology: true
//   }, (err, client) => {
//     if (err) { 
//         return console.error(err);
//     }
//     else {
//         let current = new Date();
//         clientDB = client;
//         logData = "[ "+current.toLocaleString()+" "+current.getTimezoneOffset()+" ] App got connected to Database "+connectionString+" \n";
//         fs.appendFile('./logs/APILogs.log',logData, (err) => {
//             if(err) throw err;
//         });
//         console.log(logData);
//     }
//   })
// database connectivity with Mongodb client
//-----------------------------------------------------------------------------------------------
// database connectivity with Mongoose

Mongoose.Promise = global.Promise;

Mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    let current = new Date();
    logData = "[ "+current.toLocaleString()+" "+current.getTimezoneOffset()+" ] App got connected to Database "+connectionString+" \n";
    fs.appendFile('./logs/APILogs.log',logData, (err) => {
        if(err) throw err;
    });
    console.log(logData);
})

// database connectivity with Mongoose
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
    let current = new Date();
    var newProduct = new ProdModel();
    newProduct.prd_name = req.body.name;
    newProduct.prd_desc = req.body.desc;
    newProduct.prd_price = req.body.price;
    newProduct.prd_reg_date = current.toLocaleString()+" "+current.getTimezoneOffset();
    newProduct.quantity = req.body.quantity;
    newProduct.save((err,data) => {
        if(err) throw err;
        res.send("Updated successfully");
    });
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
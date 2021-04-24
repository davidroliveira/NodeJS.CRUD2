const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();

//Routes and Templates
app.get("/", function (req, res){
    //res.send("Essa é minha página inicial"); //Enviar String
    res.sendFile(__dirname + "/index.html"); //Enviar arquivo

});


//start server
app.listen(3000, function(req, res) {
    console.log('Servidor esta rodando!');
});
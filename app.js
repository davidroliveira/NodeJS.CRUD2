const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();

//Template engine
app.engine("handlebars", handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');


//Routes and Templates
app.get("/:id?", function (req, res){ //o sinal de "?" significa que parametro no é opcional
    //res.send("Essa é minha página inicial"); //Enviar String
    //res.sendFile(__dirname + "/index.html"); //Enviar arquivo
    //res.render('index');

    //Pegar valor do parametro
    //http://localhost:3000/37 -> Parâmetro 37
    console.log(req.params.id);
});


//start server
app.listen(3000, function(req, res) {
    console.log('Servidor esta rodando!');
});
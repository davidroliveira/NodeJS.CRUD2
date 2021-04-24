//Arquivo BACKEND

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();

//Template engine
app.engine("handlebars", handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Rotas (estaticas) para diretorio com app.use
//app.use('/css',express.static('css'));//rota (estatica) para diretorio css
//app.use('/js',express.static('js'));//rota (estatica) para diretorio js

//Rotas (estaticas) por arquivo
app.get("/javascript", function(req, res){
  res.sendFile(__dirname + '/js/javascript.js');
});

app.get("/style", function(req, res){
    res.sendFile(__dirname + '/css/style.css');
});

//Routes and Templates
//app.get("/:id?", function (req, res){ //o sinal de "?" significa que parametro no é opcional
    //res.send("Essa é minha página inicial"); //Enviar String
    //res.sendFile(__dirname + "/index.html"); //Enviar arquivo
    
    //Pegar valor do parametro
    //http://localhost:3000/37 -> Parâmetro 37
    //console.log(req.params.id);

//    res.render('index', {id:req.params.id}); //Passado o valor do parametro para template
//});
app.get("/", function (req, res){
    res.render('index'); 
});

//start server
app.listen(3000, function(req, res) {
    console.log('Servidor esta rodando!');
});
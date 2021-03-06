//Arquivo BACKEND

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const { urlencoded } = require('body-parser');
const app = express();
const urlencodeParser=bodyParser.urlencoded({extended:false});
//const sql=mysql.createConnection({
const sql=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database: 'nodejs'
    //port:3306
});

let port = process.env.port || 3000; //Porta de produção ou porta 3000 padrão do nodejs;

//sql.query("use nodejs",function(error, results, fields){ //use database //usando o mysql.createConnection
//    if (error) console.log(error.message); //throw error;
//});

//sql.getConnection(function(error, connection){
//    connection.query("use nodejs",function(error, results, fields){ //use database //usando o mysql.createConnection
//        if (error) console.log(error.message); //throw error;
//    });   
//});


//Template engine
app.engine("handlebars", handlebars({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Rotas (estaticas) para diretorio com app.use
app.use('/css',express.static('css'));//rota (estatica) para diretorio css
app.use('/js',express.static('js'));//rota (estatica) para diretorio js
app.use('/img',express.static('img'));//rota (estatica) para diretorio js

/*
//Rotas (estaticas) por arquivo
app.get("/javascript", function(req, res){
  res.sendFile(__dirname + '/js/javascript.js');
});

app.get("/style", function(req, res){
    res.sendFile(__dirname + '/css/style.css');
});
*/

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

app.get("/inserir", function(req, res){
    res.render("inserir");
})

app.get("/select/:id?", function(req, res){
    if (!req.params.id) {
        //res.send("Exite");
        sql.getConnection(function(error, connection){
            connection.query("select * from user order by name", function(error, results, fields){
                if (error) {
                    console.log(error.message); //throw error;
                }
                res.render("select", {data:results});
            });
        });
    } else {
        sql.getConnection(function(error, connection){
            connection.query("select * from user where id=? order by name",[req.params.id], function(error, results, fields){
                if (error) {
                    console.log(error.message); //throw error;
                }
                res.render("select", {data:results});
            });
        });
    }
    //res.render("select");
})

app.post("/controllerForm", urlencodeParser, function(req, res){
    //res.render("inserir");
    //console.log(req.body.name);
    //console.log([req.body.id, req.body.name, req.body.age]);
    sql.getConnection(function(error, connection){
        connection.query('insert into user values(?,?,?)',[req.body.id, req.body.name, req.body.age],function(error, results, fields){
            if (error) {
                console.log(error.message); //throw error;
            }
        });
    });
    res.render("controllerForm");
})
app.get('/deletar/:id', function(req, res){
    sql.getConnection(function(error, connection){
        connection.query("delete from user where id=?",[req.params.id]);
        if (error) {
            console.log(error.message); //throw error;
        }
        res.render("deletar");
    });
});

app.get("/update/:id", function(req,res){
    sql.getConnection(function(error, connection){
        connection.query("select * from user where id=?", [req.params.id], function(error, results, fields){            
            if (error) {
                console.log(error.message); //throw error;
            }
            //console.log({id:results[0].id,name:results[0].name,age:results[0].age});
            res.render("update",{id:results[0].id,name:results[0].name,age:results[0].age});        
        });
    });
});

app.post("/controllerUpdate", urlencodeParser, function(req,res){
    sql.getConnection(function(error, connection){
        connection.query("update user set name=?, age=? where id=?",[req.body.name, req.body.age, req.body.id]);
        if (error) {
            console.log(error.message); //throw error;
        }
        res.render("controllerUpdate");
    });
});

//start server
app.listen(port, function(req, res) {
    console.log('Servidor esta rodando!');
});
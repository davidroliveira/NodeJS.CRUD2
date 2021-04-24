const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const handlebars = require('express-handlebars');
const app = express();

//start server
app.listen(3000, function(req, res) {
    console.log('Servidor esta rodando!');
});
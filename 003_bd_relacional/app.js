/*
npm init -y
npm install express --save
npm install express ejs
npm install mysql2: conexão com o BD
npm install open
*/
const express = require('express'); // importando express
const mysql = require('mysql2'); // importando mysql
const app = express(); // criando uma instancia do express
const port = 3000; // porta

// middlware que processa dados do HTML
// urlencoded(): processa dados no formato de url
// {extended:true} permite objetos complexos 
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs'); // configurando o view engine como ejs
app.use(express.static('public')) // middleware para arquivos estaticos
// conexão com o mysql
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'crud_express_mysql'
});
console.log('Pool de conexões com MySQL criado com sucesso');
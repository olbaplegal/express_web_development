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

// ROTAS DA APLICAÇÃO
// SELECT
app.get('/', (req, res) => {
    const sql = 'select * from produtos'; // query select
    pool.query(sql, (erro, dadosTabela) => { // passando a query como argumento e retornado ou o erro ou os dados da tebela
        if(erro){
            console.log('Erro na query SELECT: ', erro);
            return res.status(500).send('Erro ao busca dados'); // resposta da requisição
        }
        res.render('produtos', {produtos: dadosTabela}) // mandando a lista pro ejs
    });
});
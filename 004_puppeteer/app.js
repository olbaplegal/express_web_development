/*
INSTALAR VIA TERMINAL VS CODE
npm init -y
npm install express --save
npm install express ejs
npm install mysql2
npm install puppeteer: pacote para fazer o web scrap
npm install axios: vai fazer uma requisição pra uma API de cotação para transformar o preço em BRL
npm install open
*/

const puppeteer = require("puppeteer");
const mysql = require("mysql2/promise");
const axios = require("axios")

async function scrap(){
    const dbConfig = {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'biblioteca'
    };
    
}
/*
    INSTALAR VIA TERMINAL VS CODE
    npm init -y: cria um arquivo package.json
    npm install express --save: instalando o express e --save guarda o express como dependencia em packages.json
    npm install express ejs: ejs para criar HTML dinâmicos
    npm install open: pacote open permite abrir aplicações, URL e arquivos
*/

// path -> ferramenta para trabalhar com caminhos de arquivos e diretórios
const express = require("express"); // Importando modulos
const path = require("path"); // caminho, é como se fosse um "url_for" do python
const app = express(); // Instancia do express
const port = 8081 // Porta

app.set('view engine', 'ejs'); // Configurando o EJS como motor de visualização

//__dirname: caminho absoluto do diretorio(atual)
//path.join(): usa caminhos de forma segura. usa / ou \ dependendo do SO
app.set('views', path.join(__dirname, 'views')); // configurando views

app.use(express.static(path.join(__dirname, 'public'))); // configurando arquivo statico

// Simulação do BD
const usuarios = [
    {id:1, nome: "Juliana Silva", email: "ju.silva@gmail.com"},
    {id:2, nome: "Bruno Souza", email: "bruno.souza@outlook.com"},
    {id:3, nome: "Carla Fernandes", email: "carla.fer@yagoo.com"}
];
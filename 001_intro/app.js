/*
>Instalar via terminal
npm init -y
npm install express --save
npm install express ejs
npm install open
*/

// require("express") é a forma como o Node.js importa módulos, bibliotecas e pacotes
const express = require('express');

//Instância do express
const app = express();

/*
>O método GET é usado quando um cliente (como o navegador) quer obter dados de um servidor
>"/" é o primeiro argumento, ele define o caminho da URL, quando é apenas eles significa que é a raiz do site
>function(req, res){...} - Esta é a função de callback. É o "o que fazer" quando um evento GET acontece, essa 
função não é ativada quando o servidor liga, mas sim toda vez que um usuário acessa essa rota específica.
>res.send() instrui o servidor a enviar uma resposta.
*/
app.get("/", function(req, res){
    res.send("<h1>Hello World!<h1>") //Nesse caso a resposta do server foi um h1 com o conteúdo
})

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
// faz um parssing entre entre o tipo que é mandado na url para objeto java script
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

// CREATE
// req.body é o objeto que contém os dados enviados pelo formulário.
app.post('/adicionar', (req, res) => {
    const {nome, preco, descricao} = req.body;
    const sql = 'INSERT INTO produtos (nome, preco, descricao) VALUES (?, ?, ?)';
    pool.query(sql, [nome, preco, descricao], (erro, resultado) => {
        if(erro){
            console.log('Erro na query INSERT: ', erro);
            return res.status(500).send('Erro ao adicionar dados');
        }
        console.log('Produto adicionado com sucesso');
        res.redirect('/'); // redirecionando para raiz
    });
});

// ROTA PARA A EXIBIÇÃO DO FORMULARIO - UPDATE
app.get('/editar/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM produtos WHERE id = ?';
    pool.query(sql, [id], (erro, dadosTabela) => {
        if(erro){
            console.log('Erro na query SELECT por ID: ', erro);
            return res.status(500).send('Erro ao buscar dados para edição');
        } if (dadosTabela.length === 0){
            return res.status(404).send('Produto não encontrado');
        }
        res.render('edit_produtos', {produto : dadosTabela[0]}); // mandando os dados pro edit_produtos.ejs
    });
});

// ROTA PARA ATUALIZAR O PRODUTO - UPDATE
// O objeto req.params contém os parâmetros da rota
//Neste caso, req.params será { id:'1'} se a URL for /atualizar/1
app.post('/atualizar/:id', (req, res) => {
    const { id } = req.params; // pega o parametro id que ta na url
    const { nome, preco, descricao } = req.body;
    const sql = 'UPDATE produtos SET nome = ?, preco = ?, descricao = ? WHERE id = ?';
    pool.query(sql, [nome, preco, descricao, id], (erro, resultado) => {
        if(erro){
            console.log('Erro na query UPDATE: ', erro);
            return res.status(500).send('Erro ao atualizar od dados');
        }
        console.log('Produto atualizado com sucesso');
        res.redirect('/'); // redirecionando para raiz
    });
});

// DELETE
app.post('/deletar/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM produtos WHERE id = ?';
    pool.query(sql, [id], (erro, resultado) => {
        if(erro){
            console.log('Erro na query DELETE: ', erro);
            return res.status(500).send('Erro ao deletar os dados');
        }
        console.log('Produto deletado com seucesso')
        res.redirect('/') // redirecionado para raiz
    });
});

app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`Servidor rodadndo em http://localhost:${port}`);

    (async () => {
        try {
            const openModule = await import('open');
            await openModule.default(url);
        } catch (error) {
            console.error('Erro ao tentar abrir o navegador:', error);
        }
    })();
});
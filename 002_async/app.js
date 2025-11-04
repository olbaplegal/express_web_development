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

// ROTAS
// Rota root
app.get('/', (req, res)=>{
    // res.render(): método que processa e envia pro view
    // index é o nome do arquivo html
    // {usuarios: usuarios}: dados que serão passados pro template
    res.render('index', {usuarios: usuarios}) // Renderiza um template EJS e envia pro navegador
});

// SERVIDOR
/*
O código dentro do () => {...}: É executado apenas uma vez, assim que o servidor está pronto

Bloco (async () => {...})(): Código que abre o seu navegador padrão automaticamente na página http://localhost:8081
*/
app.listen(port, () => {
    const url = `http://localhost:${port}`;
    console.log(`Servidor rodando em http://localhost:${port}`);

    (async () => {
        try {
            // await pausa a execução somente dentro da função async específica
            // 1º pausa: o await pausa a execução do async até que 'import('open')' seja finalizado(carregado)
            const openModule = await import('open');
            // o código aqui só executa depois que a importação acima terminar

            // 2º pausa: pare a execução async até que a função de abrir o navegador termine
            await openModule.default(url);
        } catch (error) {
            console.error('Erro ao tentar abrir o navegador:', error);
        }
    })();
});
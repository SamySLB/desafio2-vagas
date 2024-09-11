const express = require('express');
const exphbs = require('express-handlebars'); // Correção do nome do pacote
const app = express();
const path = require('path');
const db = require('./db/connection');
const bodyParser = require('body-parser');

const PORT = 2000;

// Inicia o servidor
app.listen(PORT, function(){
    console.log(`O Express está rodando na porta ${PORT}`);
});

// Body Parser
app.use(bodyParser.urlencoded({ extended: false })); // Correção de 'extend' para 'extended'

// Handlebars
app.set('views', path.join(__dirname, 'views')); // Correção de _dirname para __dirname
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Static folder
app.use(express.static(path.join(__dirname, 'public'))); // Correção de _dirname para __dirname

// Conexão com o banco de dados
db.authenticate()
  .then(() => {
    console.log('Conectado ao banco com sucesso');
  })
  .catch(err => {
    console.log('Ocorreu um erro ao conectar', err);
  });

// Rotas principais
app.get('/', (req, res) => {
    res.send('index'); // Aqui seria interessante renderizar uma página, em vez de enviar uma string
});

// Rotas de jobs
app.use('/jobs', require('./routes/jobs')); // Middleware para rotas de 'jobs'

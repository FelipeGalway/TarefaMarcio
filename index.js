const express = require('express');
const mongoose = require('mongoose');
const server = express();

const funcionarioRoutes = require('./routes/funcionarioRoutes');

// Middleware
server.use(
    express.urlencoded({ 
    extended: true, 
    }),
);

server.use(express.json());

// Criando o endpoint e rotas da minha API
server.use('/funcionario', funcionarioRoutes);

// Conexão com MongoDB
const DB_USER = 'felipelegitimo';
const DB_PASSWORD = encodeURIComponent('eyxWG2tVC8b8laIi');

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.kncxep4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(()=>{
        console.log('Conectado do MongoDB!');
    })
    .catch((err)=>{
        console.log(err);
    })

// Porta do servidor
server.listen(3000);
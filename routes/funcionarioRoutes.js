const router = require('express').Router();
const Funcionario = require('../models/funcionario');

// POST (INSERT) Inserindo um novo funcionário no MongoDB
router.post('/', (req, res) => {
    const {nome, cargo, salario, desligado} = req.body;
    if(!nome && !cargo && !salario && !desligado){
        res.status(422).json({ error: 'Informar o nome, cargo, salário e desligado é obrigatório!'});
    }
    const funcionario = {
        nome,
        cargo, 
        salario, 
        desligado,
    };
    try {
        Funcionario.create(funcionario);
        res.status(201).json({message: 'Funcionário cadastrado com sucesso'})
    } catch (error) {
        res.status(500).json({error: error});
    }
});

module.exports = router;

// GET Listar todos os funcionários
router.get('/', async (req, res) => {
    try {
        const funcionarios = await Funcionario.find();
        res.status(200).json(funcionarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET Obter informações de um funcionário por ID
router.get('/:id', async (req, res) => {
    try {
        const funcionario = await Funcionario.findById(req.params.id);
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json(funcionario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT Atualizar informações de um funcionário por ID
router.put('/:id', async (req, res) => {
    const { nome, cargo, salario, desligado } = req.body;
    try {
        const funcionario = await Funcionario.findByIdAndUpdate(
            req.params.id,
            { nome, cargo, salario, desligado },
            { new: true }
        );
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json({ message: 'Funcionário atualizado com sucesso', funcionario });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE Deletar um funcionário por ID
router.delete('/:id', async (req, res) => {
    try {
        const funcionario = await Funcionario.findByIdAndDelete(req.params.id);
        if (!funcionario) {
            return res.status(404).json({ message: 'Funcionário não encontrado' });
        }
        res.status(200).json({ message: 'Funcionário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



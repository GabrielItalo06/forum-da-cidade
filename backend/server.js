const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');

const serviceAccount = require('./json/forum-da-cidade-firebase-adminsdk-czhqk-4202b6474c.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = 3000;

app.post('/usuario', async (req, res) => {
    const { nome, email, telefone } = req.body;
    const data = { nome, email, telefone };

    try {
        await db.collection('usuarios').doc().set(data);
        console.log('Usuário adicionado:', data);
        res.status(200).send('Usuário adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error.message);
        res.status(500).send('Erro interno do servidor');
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuariosSnapshot = await db.collection('usuarios').get();
        const usuarios = usuariosSnapshot.docs.map(doc => doc.data());
        console.log('Usuários recuperados:', usuarios);
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error.message);
        res.status(500).send('Erro interno do servidor');
    }
});

app.post('/enviar-email', async (req, res) => {
    const { nome, motivo, denuncia } = req.body;

    try {
        const docRef = await db.collection('denuncia').add({
            nome,
            motivo,
            denuncia,
            data: new Date()
        });
        console.log('Denúncia adicionada com ID:', docRef.id);
        res.status(200).send('Denúncia enviada com sucesso');
    } catch (error) {
        console.error('Erro ao salvar denúncia:', error);
        res.status(500).send('Erro ao salvar denúncia');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

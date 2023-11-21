import formService from '../services/formService.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = form.elements['nome'].value;
        const email = form.elements['email'].value;
        const telefone = form.elements['telefone'].value;

        try {
            const response = await formService.adicionarUsuario({ nome, email, telefone });
            console.log(response);
            alert('Usuário adicionado com sucesso!');
            form.reset();
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            alert('Erro ao adicionar usuário.');
        }
    });
});

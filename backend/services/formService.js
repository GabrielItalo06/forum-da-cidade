const API_URL = 'http://localhost:3000';

const formService = {
    async adicionarUsuario(usuario) {
        try {
            const response = await fetch(`${API_URL}/usuario`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuario),
            });
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Erro ao adicionar usuário:', error);
            throw error;
        }
    },

    async listarUsuarios() {
        try {
            const response = await fetch(`${API_URL}/usuarios`);
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao listar usuários:', error);
            throw error;
        }
    }
};

export default formService;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = form.elements['nome'].value;
        const motivo = form.elements['motivo'].value;
        const denuncia = form.elements['denuncia'].value;

        try {
            const response = await fetch('http://localhost:3000/enviar-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, motivo, denuncia }),
            });

            if (response.ok) {
                alert('Denúncia enviada com sucesso!');
            } else {
                throw new Error('Falha ao enviar denúncia');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar denúncia.');
        }
    });
});

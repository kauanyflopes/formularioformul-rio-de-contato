// Lida com o envio do formulário
if (document.getElementById('contactForm')) {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Captura os valores dos campos do formulário
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Recupera as mensagens existentes do localStorage
        const messages = JSON.parse(localStorage.getItem('messages')) || [];

        // Adiciona a nova mensagem à lista
        messages.push({ name, email, message });

        // Salva a lista atualizada no localStorage
        localStorage.setItem('messages', JSON.stringify(messages));

        console.log('Mensagens salvas no localStorage:', messages); // Depuração

        alert('Mensagem enviada com sucesso!');
        form.reset(); // Limpa os campos do formulário
    });
}

// Exibe as mensagens na página de listagem
if (document.getElementById('messagesList')) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messagesList = document.getElementById('messagesList');

    console.log('Mensagens carregadas do localStorage:', messages); // Depuração

    // Adiciona cada mensagem à lista
    messages.forEach((msg, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>
                <strong>${msg.name}</strong> (${msg.email})<br>
                ${msg.message}
            </div>
            <button onclick="removeMessage(${index})">Remover</button>
        `;
        messagesList.appendChild(listItem);
    });

    // Exibe uma mensagem se não houver mensagens
    if (messages.length === 0) {
        messagesList.innerHTML = '<p>Nenhuma mensagem encontrada.</p>';
    }

    // Configura o botão para remover todas as mensagens
    const clearAllButton = document.getElementById('clearAll');
    if (clearAllButton) {
        clearAllButton.addEventListener('click', function () {
            localStorage.removeItem('messages'); // Remove todas as mensagens do localStorage
            messagesList.innerHTML = '<p>Nenhuma mensagem encontrada.</p>';
            alert('Todas as mensagens foram removidas!');
            console.log('Mensagens após limpar:', localStorage.getItem('messages')); // Depuração
        });
    }
}

// Função para remover uma mensagem específica
function removeMessage(index) {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.splice(index, 1); // Remove a mensagem pelo índice
    localStorage.setItem('messages', JSON.stringify(messages)); // Atualiza o localStorage

    console.log('Mensagens após remoção:', messages); // Depuração

    // Atualiza dinamicamente a lista sem recarregar a página
    const messagesList = document.getElementById('messagesList');
    const itemToRemove = messagesList.children[index];
    if (itemToRemove) {
        itemToRemove.remove(); // Remove o item da lista
    }

    // Exibe uma mensagem se a lista estiver vazia
    if (messages.length === 0) {
        messagesList.innerHTML = '<p>Nenhuma mensagem encontrada.</p>';
    }
}

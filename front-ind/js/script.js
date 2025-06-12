const cardContainer = document.getElementById('cardContainer');

let carros = [];

async function loadCards() {
    try {
        const response = await fetch('http://localhost:8080/api/carros/listarCarro');
        carros = await response.json();
        renderCards();
    } catch (error) {
        console.error('Erro ao carregar carros:', error);
    }
}

function renderCards(carrosParam) {
    const lista = carrosParam || carros;

    cardContainer.innerHTML = '';

    if (!lista || lista.length === 0) {
        cardContainer.innerHTML = '<p>Nenhum carro encontrado.</p>';
        return;
    }

    lista.forEach((carro) => {
        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = carro.foto || 'https://via.placeholder.com/400x250?text=Sem+Foto'; // Placeholder melhorado
        image.alt = `Foto do ${carro.marca} ${carro.modelo}`; // Texto alternativo para acessibilidade
        card.appendChild(image);


        const marca = document.createElement('h2');
        marca.textContent = carro.marca;
        card.appendChild(marca);

        const modelo = document.createElement('h3');
        modelo.textContent = carro.modelo;
        card.appendChild(modelo);

        if (carro.ano !== undefined) {
            const ano = document.createElement('p');
            ano.textContent = `Ano: ${ carro.ano }`;
            card.appendChild(ano);
        }

        const cor = document.createElement('p');
        cor.textContent = `Cor: ${ carro.cor }`;
        card.appendChild(cor);

        const preco = document.createElement('p');
        
        preco.textContent = `Preço: ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(carro.preco)}`;
        card.appendChild(preco);

        const quilometragem = document.createElement('p');
        
        quilometragem.textContent = `Quilometragem: ${new Intl.NumberFormat('pt-BR').format(carro.quilometragem)} km`;
        card.appendChild(quilometragem);

        const disponibilidade = document.createElement('p');
        disponibilidade.textContent = `Disponibilidade: ${ carro.disponibilidade ? 'Disponível' : 'Indisponível' }`;
        card.appendChild(disponibilidade);


        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => {
            localStorage.setItem('carroParaEditar', JSON.stringify(carro));
            window.location.href = 'editarVeiculo.html';
        };
        card.appendChild(editButton);


        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.onclick = () => deleteCar(carro.id);
        card.appendChild(deleteButton);

        cardContainer.appendChild(card);
    });
}

async function adicionarCarro() {
    const modelo = document.getElementById('modeloInput').value.trim();
    const marca = document.getElementById('marcaInput').value.trim();
    const cor = document.getElementById('corInput').value.trim();
    const preco = parseFloat(document.getElementById('precoInput').value);
    const quilometragem = parseInt(document.getElementById('quilometragemInput').value);
    const disponibilidade = document.getElementById('opcoes').value === '1'; // true se 1, false se 2
    const foto = document.getElementById('fotoInput').value.trim(); // Novo campo para a URL da foto

    if (modelo && marca && cor && !isNaN(preco) && !isNaN(quilometragem) && foto) { // Adicionado 'foto' na validação
        const newCar = {
            modelo,
            marca,
            cor,
            preco,
            quilometragem,
            disponibilidade,
            foto, 
        };

        try {
            const response = await fetch('http://localhost:8080/api/carros/cadastrarCarro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCar),
            });

            if (response.ok) {
                loadCards();
                clearForm();
            } else {
                const errorText = await response.text();
                console.error('Erro ao cadastrar carro:', errorText);
                alert('Erro ao cadastrar: ' + errorText);
            }
        } catch (error) {
            console.error('Erro ao cadastrar carro:', error);
            alert('Erro ao cadastrar: ' + error.message);
        }
    } else {
        alert('Por favor, preencha todos os campos, incluindo a URL da foto.');
    }
}

function clearForm() {
    document.getElementById('modeloInput').value = '';
    document.getElementById('marcaInput').value = '';
    document.getElementById('corInput').value = '';
    document.getElementById('precoInput').value = '';
    document.getElementById('quilometragemInput').value = '';
    document.getElementById('fotoInput').value = ''; 

}

async function deleteCar(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/carros/deletarCarro/${id}`, {
            method: 'DELETE',
        });

    if (response.ok) {
        loadCards();
    } else {
        console.error('Erro ao deletar carro:', await response.text());
    }
    } catch (error) {
        console.error('Erro ao deletar carro:', error);
    }
}


function search() {
    const searchInput = document.getElementById('searchInput').value.trim();

    if (!searchInput) {
        loadCards();
        return;
    }

    fetch(`http://localhost:8080/api/carros/buscar?termo=${encodeURIComponent(searchInput)}`)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Erro na requisição: ${text || response.statusText}`);
                });
            }
            return response.json();
        })
        .then(data => {
            carros = data;
            renderCards(data);
        })
        .catch(error => {
            console.error('Erro ao buscar carros:', error);
        });
}

loadCards();
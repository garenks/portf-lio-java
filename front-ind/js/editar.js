
const carroParaEditar = JSON.parse(localStorage.getItem('carroParaEditar'));

const modeloInput = document.getElementById('modeloInput');
const marcaInput = document.getElementById('marcaInput');
const corInput = document.getElementById('corInput');
const precoInput = document.getElementById('precoInput');
const quilometragemInput = document.getElementById('quilometragemInput');
const disponibilidadeSelect = document.getElementById('opcoes');
const fotoInput = document.getElementById('fotoInput'); // Novo: Referência ao campo de foto
const editarBtn = document.getElementById('editarBtn');


if (carroParaEditar) {
    modeloInput.value = carroParaEditar.modelo || '';
    marcaInput.value = carroParaEditar.marca || '';
    corInput.value = carroParaEditar.cor || '';
    precoInput.value = carroParaEditar.preco || '';
    quilometragemInput.value = carroParaEditar.quilometragem || '';
    disponibilidadeSelect.value = carroParaEditar.disponibilidade ? '1' : '2'; // Preenche o select corretamente
    fotoInput.value = carroParaEditar.foto || ''; // Preenche o campo de foto
} else {
    alert('Nenhum carro selecionado para editar.');
    window.location.href = 'index.html';
}


async function editarCarro() {
    const modelo = modeloInput.value.trim();
    const marca = marcaInput.value.trim();
    const cor = corInput.value.trim();
    const preco = precoInput.value.trim();
    const quilometragem = quilometragemInput.value.trim();
    const disponibilidade = disponibilidadeSelect.value;
    const foto = fotoInput.value.trim(); 

    if (!modelo || !marca || !cor || !preco || !quilometragem || !foto) { // Adicionado 'foto' na validação
        alert('Por favor, preencha todos os campos, incluindo a URL da foto.');
        return;
    }

    const carroAtualizado = {
        modelo,
        marca,
        cor,
        preco: parseFloat(preco),
        quilometragem: parseInt(quilometragem),
        disponibilidade: disponibilidade === '1',
        foto, 
    };

    try {
        const response = await fetch(`http://localhost:8080/api/carros/atualizarCarro/${carroParaEditar.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carroAtualizado),
        });

        if (response.ok) {
            alert('Carro atualizado com sucesso!');
            localStorage.removeItem('carroParaEditar');
            window.location.href = 'index.html';
        } else {
            const errorText = await response.text();
            alert('Erro ao atualizar carro: ' + errorText);
        }
    } catch (error) {
        alert('Erro ao atualizar carro: ' + error.message);
    }
}

editarBtn.addEventListener('click', editarCarro);
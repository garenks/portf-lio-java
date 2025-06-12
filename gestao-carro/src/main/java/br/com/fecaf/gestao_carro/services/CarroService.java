package br.com.fecaf.gestao_carro.services;

import br.com.fecaf.gestao_carro.model.Carro;
import br.com.fecaf.gestao_carro.repository.CarroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarroService {

    @Autowired
    private CarroRepository carroRepository;

    public List<Carro> listarCarros() {
        return carroRepository.findAll();
    }

    public Carro salvarCarro(Carro carro) {
        return carroRepository.save(carro);
    }

    public void deletarCarro(int id) {
        if (!carroRepository.existsById(id)) {
            throw new RuntimeException("Carro não encontrado com o ID: " + id);
        }
        carroRepository.deleteById(id);
    }

    public Carro atualizarCarro(int id, Carro carroDetails) {
        Optional<Carro> carroOptional = carroRepository.findById(id);

        if (carroOptional.isPresent()) {
            Carro carro = carroOptional.get();
            carro.setModelo(carroDetails.getModelo());
            carro.setMarca(carroDetails.getMarca());
            carro.setQuilometragem(carroDetails.getQuilometragem());
            carro.setDisponibilidade(carroDetails.isDisponibilidade());
            carro.setPreco(carroDetails.getPreco());
            carro.setCor(carroDetails.getCor());
            carro.setFoto(carroDetails.getFoto());

            return carroRepository.save(carro);
        } else {
            throw new RuntimeException("Carro não encontrado com o ID: " + id);
        }
    }


    public List<Carro> buscarCarrosPorTermo(String termo) {
        if (termo == null || termo.trim().isEmpty()) {
            return listarCarros();
        }

        termo = termo.trim().toLowerCase();


        if (termo.equals("disponivel") || termo.equals("disponível") || termo.equals("true") || termo.equals("sim")) {

            return carroRepository.findByDisponibilidade(true);
        } else if (termo.equals("indisponivel") || termo.equals("indisponível") || termo.equals("false") || termo.equals("nao") || termo.equals("não")) {

            return carroRepository.findByDisponibilidade(false);
        } else {

            return carroRepository.buscarPorTermoGenerico(termo);
        }
    }
}
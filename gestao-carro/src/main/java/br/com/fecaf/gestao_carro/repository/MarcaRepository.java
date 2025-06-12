package br.com.fecaf.gestao_carro.repository;

import br.com.fecaf.gestao_carro.model.Marca;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepository extends JpaRepository<Marca, Integer> {
}

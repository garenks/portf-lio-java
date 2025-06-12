package br.com.fecaf.gestao_carro.repository;

import br.com.fecaf.gestao_carro.model.Modelo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModeloRepository extends JpaRepository<Modelo, Integer> {
}

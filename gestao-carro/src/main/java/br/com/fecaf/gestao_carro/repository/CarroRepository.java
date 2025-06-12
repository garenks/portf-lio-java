package br.com.fecaf.gestao_carro.repository;

import br.com.fecaf.gestao_carro.model.Carro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarroRepository extends JpaRepository<Carro, Integer> {

    List<Carro> findByDisponibilidade(Boolean disponibilidade);


    @Query(
            value = "SELECT * FROM veiculos c WHERE " +
                    "LOWER(c.modelo) LIKE CONCAT('%', LOWER(:termo), '%') OR " +
                    "LOWER(c.marca) LIKE CONCAT('%', LOWER(:termo), '%') OR " +
                    "LOWER(c.cor) LIKE CONCAT('%', LOWER(:termo), '%') OR " +
                    "LOWER(c.foto) LIKE CONCAT('%', LOWER(:termo), '%') OR " +

                    "CAST(c.preco AS CHAR) LIKE CONCAT('%', :termo, '%') OR " +

                    "CAST(c.quilometragem AS CHAR) LIKE CONCAT('%', :termo, '%')",
            nativeQuery = true
    )
    List<Carro> buscarPorTermoGenerico(@Param("termo") String termo);
}
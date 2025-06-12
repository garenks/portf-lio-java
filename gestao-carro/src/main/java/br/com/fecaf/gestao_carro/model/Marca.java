package br.com.fecaf.gestao_carro.model;

import jakarta.persistence.*;

@Entity
@Table (name = "marcas")

public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nome;

    public void setId(int id) {
        this.id = id;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

}

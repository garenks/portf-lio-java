package br.com.fecaf.gestao_carro.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "veiculos")
public class Carro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String cor;
    private String marca;
    private String modelo;
    private String foto;

    @Column(precision = 10, scale = 2)
    private BigDecimal preco;

    private int quilometragem;
    private boolean disponibilidade;

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public Carro() {

    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getCor() {
        return cor;
    }
    public void setCor(String cor) {
        this.cor = cor;
    }

    public String getMarca() {
        return marca;
    }
    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }
    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public BigDecimal getPreco() {
        return preco;
    }
    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public int getQuilometragem() {
        return quilometragem;
    }
    public void setQuilometragem(int quilometragem) {
        this.quilometragem = quilometragem;
    }

    public boolean isDisponibilidade() {
        return disponibilidade;
    }
    public void setDisponibilidade(boolean disponibilidade) {
        this.disponibilidade = disponibilidade;
    }
}
